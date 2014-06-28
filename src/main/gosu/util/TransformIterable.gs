package util

uses java.lang.Iterable
uses java.util.Iterator
uses com.mongodb.DBCursor

class TransformIterable <T> implements Iterable<T>, SkipIterable<T> {

  var _wrapped : DBCursor
  var _transform : block(o:Object):T

  construct(wrapped: DBCursor, transform : block(o:Object):T) {
    _wrapped = wrapped
    _transform = transform
  }

  override function iterator(): Iterator<T> {
    return new TransformIterator<T>(_wrapped.iterator(), _transform)
  }

  override function skip(n: long) {
    _wrapped = _wrapped.skip(n as int)
  }

  override function copy(): TransformIterable<T> {
    return new TransformIterable<T>(_wrapped, _transform)
  }

  override property get Count(): long {
    return _wrapped.Count
  }

  static class TransformIterator<TT> implements Iterator<TT> {

    var _iter : Iterator
    var _tr : block(o:Object):TT

    construct(i : Iterator, transform : block(o:Object):TT ) {
      _iter = i
    }

    override function hasNext(): boolean {
      return _iter.hasNext()
    }

    override function next(): TT {
    return _tr(_iter.next())
  }

    override function remove() {
      _iter.remove();
    }

  }

}