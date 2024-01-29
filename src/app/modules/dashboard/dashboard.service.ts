import { Eyeglass } from '../eyeglass/eyeglass.model';
import { Sale } from '../sale/sale.model';

// dashboard home service
const getDashboard = async () => {
  const totalSales = await Sale.countDocuments();
  // const sales = await Sale.find().sort({ saleAt: -1 });
  const totalEyeglasses = await Eyeglass.countDocuments();

  const sales = await Sale.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%U', date: '$saleAt' },
        },
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const totalRevenue = await Sale.aggregate([
    {
      $lookup: {
        from: 'eyeglasses',
        localField: 'product',
        foreignField: '_id',
        as: 'eyeglass',
      },
    },
    {
      $unwind: '$eyeglass',
    },
    {
      $project: {
        quantity: 1,
        price: '$eyeglass.price',
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: { $multiply: ['$quantity', '$price'] } },
      },
    },
  ]);

  const totalSaleAmount =
    totalRevenue.length > 0 ? totalRevenue[0].totalRevenue : 0;

  return {
    sales,
    totalSales,
    totalEyeglasses,
    totalRevenue: totalSaleAmount,
  };
};

// exporting dashboard services
export const DashboardServices = { getDashboard };
