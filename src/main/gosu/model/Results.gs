package model

uses java.util.Map
uses org.json.simple.JSONArray
uses org.json.simple.JSONValue
uses org.json.simple.JSONObject

class Results {

  static var DS = new MongoCollection ('RECOMMENDATION_RESULTS_COLLECTION')

  static function addResults(UUID : String, results : List<Map<Object,Object>>) {
    DS.insert({'UUId' -> UUID,
               'Results' -> results})
  }

  static function getResults(UUID : String) : List<Map<Object,Object>> {
    var results = DS.findOne({'UUId' -> UUID})?['Results'] as String
    var jArray = results == null ? null : JSONValue.parse(results) as JSONArray
    return jArray?.map(\ o -> o as JSONObject)
  }

  static property get AllResults() : List<String> {
    return DS.find()?.toList()?.map(\ o -> o['UUId'] as String)
  }

}