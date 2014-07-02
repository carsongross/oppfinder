package recommender

uses org.apache.mahout.cf.taste.model.DataModel
uses org.apache.mahout.cf.taste.similarity.ItemSimilarity
uses util.MahoutUtil
uses model.MongoCollection
uses org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity

class RevenueFieldImpl implements Field {
  override function getModel(collection : String): DataModel {
    return MahoutUtil.toDataModel(new MongoCollection (collection), "Revenue", \ o -> o.toLong(), null)
  }

  override function getSimilarity(model : DataModel): ItemSimilarity {
    return new PearsonCorrelationSimilarity(model)
  }
}