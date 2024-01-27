import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  private searchQuery: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, searchQuery: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.searchQuery = searchQuery;
  }

  public searching(searchAbleFields: string[]) {
    const searchTerm = this.searchQuery?.searchTerm || '';
    this.modelQuery = this.modelQuery.find({
      $or: searchAbleFields.map(
        (field) =>
          ({
            [field]: { $regex: searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      ),
    });
    return this;
  }

  public filtering() {
    const queryObject = { ...this.searchQuery };

    // price range filtering -> price= 200-400,
    if (queryObject.price) {
      const price = (queryObject?.price as string)
        .split('-')
        .map((item) => Number(item));
      const lowPrice = price[0] < price[1] ? price[0] : price[1];
      const highPrice = price[0] > price[1] ? price[0] : price[1];

      if (highPrice & lowPrice) {
        this.modelQuery = this.modelQuery.find({
          price: {
            $gte: lowPrice,
            $lte: highPrice,
          },
        });
      }
    }

    const excludeFields = ['searchTerm', 'page', 'limit', 'price'];
    excludeFields.forEach((field) => delete queryObject[field]);

    this.modelQuery = this.modelQuery.find(queryObject as FilterQuery<T>);
    return this;
  }

  public paginating() {
    const page = Number(this.searchQuery?.page) || 1;
    const limit = Number(this.searchQuery?.limit) || 12;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }
}

export default QueryBuilder;