package recommender

uses org.apache.mahout.cf.taste.model.DataModel
uses org.apache.mahout.cf.taste.similarity.UserSimilarity
uses util.MahoutUtil
uses model.DataSet
uses model.DataSetEntry
uses org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity

class RevenueFieldImpl implements Field {
  override function getModel(): DataModel {
    return MahoutUtil.toDataModel(new DataSet(DataSetEntry.COLLECTION), "Revenue", \ o -> o.toLong(), null)
  }

  override function getSimilarity(model : DataModel): UserSimilarity {
    return new PearsonCorrelationSimilarity(model)
  }
}