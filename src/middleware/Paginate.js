export default async (req, res, next) => {
  const { page, limit } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  if (
    typeof pageNumber === 'number'
      && typeof limitNumber === 'number'
      && typeof page !== 'undefined'
      && typeof limit !== 'undefined'
  ) {
    if (pageNumber <= 0 || limitNumber <= 0) {
      req.paginate = undefined;
    } else {
      req.paginate = {
        page: pageNumber,
        limit: limitNumber,
        offset: limitNumber * (pageNumber - 1),
      };
    }
  }
  next();
};
