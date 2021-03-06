package model.database.iterable

uses java.lang.Iterable
uses com.mongodb.DBCursor

interface SkipIterable <E> extends Iterable<E> {

  function skip(n : long)

  property get Count() : long

  property get Cursor() : DBCursor

  function paginate(page : String) : PagerIterable<E>

}