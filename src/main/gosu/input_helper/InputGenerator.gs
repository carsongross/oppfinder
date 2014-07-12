package input_helper

uses gw.lang.reflect.features.PropertyReference
uses java.lang.Enum
uses java.lang.Iterable
uses java.lang.StringBuffer
uses java.util.Map

class InputGenerator {

  static function textInput(literal : PropertyReference, value : String = "") : String {
    return TagHelper.tag('input', {'name' -> format(literal),
                                   'value' -> value})
  }

  static function submit(text : String = 'Submit') : String {
    return TagHelper.tag('input', {'type' -> 'submit',
                                   'value' -> text})
  }

  private static function format(literal : PropertyReference) : String {
    return "${literal.RootType.RelativeName}[${literal.PropertyInfo.Name}]"
  }

  static function select(literal : PropertyReference, name : String, options : Map<String, String> = null) : String {
    return TagHelper.contentTag('select', options(literal), {'name' -> name}.merge(options))
  }

  private static function options(literal : PropertyReference) : String {
    var buf = new StringBuffer()
    var values : Iterable
    if (literal.PropertyInfo typeis Enum) {
    } else if (literal.PropertyInfo.FeatureType typeis Type<List>) {
      values = literal.RootType[literal.PropertyInfo.Name] as List<Object>
      for (value in values) {
        buf.append(TagHelper.contentTag("option",value as String, {'value' -> value as String}))
      }
    }
    return buf.toString()
  }

}