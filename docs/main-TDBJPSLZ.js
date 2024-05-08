var T0 = Object.defineProperty,
  A0 = Object.defineProperties;
var N0 = Object.getOwnPropertyDescriptors;
var Xf = Object.getOwnPropertySymbols;
var R0 = Object.prototype.hasOwnProperty,
  O0 = Object.prototype.propertyIsEnumerable;
var Jf = (t, e, r) =>
    e in t
      ? T0(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (t[e] = r),
  v = (t, e) => {
    for (var r in (e ||= {})) R0.call(e, r) && Jf(t, r, e[r]);
    if (Xf) for (var r of Xf(e)) O0.call(e, r) && Jf(t, r, e[r]);
    return t;
  },
  Z = (t, e) => A0(t, N0(e));
var jo = (t, e, r) =>
  new Promise((n, i) => {
    var o = (l) => {
        try {
          a(r.next(l));
        } catch (c) {
          i(c);
        }
      },
      s = (l) => {
        try {
          a(r.throw(l));
        } catch (c) {
          i(c);
        }
      },
      a = (l) => (l.done ? n(l.value) : Promise.resolve(l.value).then(o, s));
    a((r = r.apply(t, e)).next());
  });
var eh = null;
var Vl = 1,
  jl = Symbol("SIGNAL");
function W(t) {
  let e = eh;
  return (eh = t), e;
}
var th = {
  version: 0,
  lastCleanEpoch: 0,
  dirty: !1,
  producerNode: void 0,
  producerLastReadVersion: void 0,
  producerIndexOfThis: void 0,
  nextProducerIndex: 0,
  liveConsumerNode: void 0,
  liveConsumerIndexOfThis: void 0,
  consumerAllowSignalWrites: !1,
  consumerIsAlwaysLive: !1,
  producerMustRecompute: () => !1,
  producerRecomputeValue: () => {},
  consumerMarkedDirty: () => {},
  consumerOnSignalRead: () => {},
};
function k0(t) {
  if (!(Ul(t) && !t.dirty) && !(!t.dirty && t.lastCleanEpoch === Vl)) {
    if (!t.producerMustRecompute(t) && !Bl(t)) {
      (t.dirty = !1), (t.lastCleanEpoch = Vl);
      return;
    }
    t.producerRecomputeValue(t), (t.dirty = !1), (t.lastCleanEpoch = Vl);
  }
}
function nh(t) {
  return t && (t.nextProducerIndex = 0), W(t);
}
function rh(t, e) {
  if (
    (W(e),
    !(
      !t ||
      t.producerNode === void 0 ||
      t.producerIndexOfThis === void 0 ||
      t.producerLastReadVersion === void 0
    ))
  ) {
    if (Ul(t))
      for (let r = t.nextProducerIndex; r < t.producerNode.length; r++)
        $l(t.producerNode[r], t.producerIndexOfThis[r]);
    for (; t.producerNode.length > t.nextProducerIndex; )
      t.producerNode.pop(),
        t.producerLastReadVersion.pop(),
        t.producerIndexOfThis.pop();
  }
}
function Bl(t) {
  Bo(t);
  for (let e = 0; e < t.producerNode.length; e++) {
    let r = t.producerNode[e],
      n = t.producerLastReadVersion[e];
    if (n !== r.version || (k0(r), n !== r.version)) return !0;
  }
  return !1;
}
function ih(t) {
  if ((Bo(t), Ul(t)))
    for (let e = 0; e < t.producerNode.length; e++)
      $l(t.producerNode[e], t.producerIndexOfThis[e]);
  (t.producerNode.length =
    t.producerLastReadVersion.length =
    t.producerIndexOfThis.length =
      0),
    t.liveConsumerNode &&
      (t.liveConsumerNode.length = t.liveConsumerIndexOfThis.length = 0);
}
function $l(t, e) {
  if ((P0(t), Bo(t), t.liveConsumerNode.length === 1))
    for (let n = 0; n < t.producerNode.length; n++)
      $l(t.producerNode[n], t.producerIndexOfThis[n]);
  let r = t.liveConsumerNode.length - 1;
  if (
    ((t.liveConsumerNode[e] = t.liveConsumerNode[r]),
    (t.liveConsumerIndexOfThis[e] = t.liveConsumerIndexOfThis[r]),
    t.liveConsumerNode.length--,
    t.liveConsumerIndexOfThis.length--,
    e < t.liveConsumerNode.length)
  ) {
    let n = t.liveConsumerIndexOfThis[e],
      i = t.liveConsumerNode[e];
    Bo(i), (i.producerIndexOfThis[n] = e);
  }
}
function Ul(t) {
  return t.consumerIsAlwaysLive || (t?.liveConsumerNode?.length ?? 0) > 0;
}
function Bo(t) {
  (t.producerNode ??= []),
    (t.producerIndexOfThis ??= []),
    (t.producerLastReadVersion ??= []);
}
function P0(t) {
  (t.liveConsumerNode ??= []), (t.liveConsumerIndexOfThis ??= []);
}
function F0() {
  throw new Error();
}
var L0 = F0;
function oh(t) {
  L0 = t;
}
function P(t) {
  return typeof t == "function";
}
function Ir(t) {
  let r = t((n) => {
    Error.call(n), (n.stack = new Error().stack);
  });
  return (
    (r.prototype = Object.create(Error.prototype)),
    (r.prototype.constructor = r),
    r
  );
}
var $o = Ir(
  (t) =>
    function (r) {
      t(this),
        (this.message = r
          ? `${r.length} errors occurred during unsubscription:
${r.map((n, i) => `${i + 1}) ${n.toString()}`).join(`
  `)}`
          : ""),
        (this.name = "UnsubscriptionError"),
        (this.errors = r);
    }
);
function Yn(t, e) {
  if (t) {
    let r = t.indexOf(e);
    0 <= r && t.splice(r, 1);
  }
}
var De = class t {
  constructor(e) {
    (this.initialTeardown = e),
      (this.closed = !1),
      (this._parentage = null),
      (this._finalizers = null);
  }
  unsubscribe() {
    let e;
    if (!this.closed) {
      this.closed = !0;
      let { _parentage: r } = this;
      if (r)
        if (((this._parentage = null), Array.isArray(r)))
          for (let o of r) o.remove(this);
        else r.remove(this);
      let { initialTeardown: n } = this;
      if (P(n))
        try {
          n();
        } catch (o) {
          e = o instanceof $o ? o.errors : [o];
        }
      let { _finalizers: i } = this;
      if (i) {
        this._finalizers = null;
        for (let o of i)
          try {
            sh(o);
          } catch (s) {
            (e = e ?? []),
              s instanceof $o ? (e = [...e, ...s.errors]) : e.push(s);
          }
      }
      if (e) throw new $o(e);
    }
  }
  add(e) {
    var r;
    if (e && e !== this)
      if (this.closed) sh(e);
      else {
        if (e instanceof t) {
          if (e.closed || e._hasParent(this)) return;
          e._addParent(this);
        }
        (this._finalizers =
          (r = this._finalizers) !== null && r !== void 0 ? r : []).push(e);
      }
  }
  _hasParent(e) {
    let { _parentage: r } = this;
    return r === e || (Array.isArray(r) && r.includes(e));
  }
  _addParent(e) {
    let { _parentage: r } = this;
    this._parentage = Array.isArray(r) ? (r.push(e), r) : r ? [r, e] : e;
  }
  _removeParent(e) {
    let { _parentage: r } = this;
    r === e ? (this._parentage = null) : Array.isArray(r) && Yn(r, e);
  }
  remove(e) {
    let { _finalizers: r } = this;
    r && Yn(r, e), e instanceof t && e._removeParent(this);
  }
};
De.EMPTY = (() => {
  let t = new De();
  return (t.closed = !0), t;
})();
var Hl = De.EMPTY;
function Uo(t) {
  return (
    t instanceof De ||
    (t && "closed" in t && P(t.remove) && P(t.add) && P(t.unsubscribe))
  );
}
function sh(t) {
  P(t) ? t() : t.unsubscribe();
}
var _t = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: void 0,
  useDeprecatedSynchronousErrorHandling: !1,
  useDeprecatedNextContext: !1,
};
var _r = {
  setTimeout(t, e, ...r) {
    let { delegate: n } = _r;
    return n?.setTimeout ? n.setTimeout(t, e, ...r) : setTimeout(t, e, ...r);
  },
  clearTimeout(t) {
    let { delegate: e } = _r;
    return (e?.clearTimeout || clearTimeout)(t);
  },
  delegate: void 0,
};
function Ho(t) {
  _r.setTimeout(() => {
    let { onUnhandledError: e } = _t;
    if (e) e(t);
    else throw t;
  });
}
function Ei() {}
var ah = zl("C", void 0, void 0);
function lh(t) {
  return zl("E", void 0, t);
}
function ch(t) {
  return zl("N", t, void 0);
}
function zl(t, e, r) {
  return { kind: t, value: e, error: r };
}
var Kn = null;
function Sr(t) {
  if (_t.useDeprecatedSynchronousErrorHandling) {
    let e = !Kn;
    if ((e && (Kn = { errorThrown: !1, error: null }), t(), e)) {
      let { errorThrown: r, error: n } = Kn;
      if (((Kn = null), r)) throw n;
    }
  } else t();
}
function uh(t) {
  _t.useDeprecatedSynchronousErrorHandling &&
    Kn &&
    ((Kn.errorThrown = !0), (Kn.error = t));
}
var Xn = class extends De {
    constructor(e) {
      super(),
        (this.isStopped = !1),
        e
          ? ((this.destination = e), Uo(e) && e.add(this))
          : (this.destination = B0);
    }
    static create(e, r, n) {
      return new sn(e, r, n);
    }
    next(e) {
      this.isStopped ? Gl(ch(e), this) : this._next(e);
    }
    error(e) {
      this.isStopped
        ? Gl(lh(e), this)
        : ((this.isStopped = !0), this._error(e));
    }
    complete() {
      this.isStopped ? Gl(ah, this) : ((this.isStopped = !0), this._complete());
    }
    unsubscribe() {
      this.closed ||
        ((this.isStopped = !0), super.unsubscribe(), (this.destination = null));
    }
    _next(e) {
      this.destination.next(e);
    }
    _error(e) {
      try {
        this.destination.error(e);
      } finally {
        this.unsubscribe();
      }
    }
    _complete() {
      try {
        this.destination.complete();
      } finally {
        this.unsubscribe();
      }
    }
  },
  V0 = Function.prototype.bind;
function Wl(t, e) {
  return V0.call(t, e);
}
var ql = class {
    constructor(e) {
      this.partialObserver = e;
    }
    next(e) {
      let { partialObserver: r } = this;
      if (r.next)
        try {
          r.next(e);
        } catch (n) {
          zo(n);
        }
    }
    error(e) {
      let { partialObserver: r } = this;
      if (r.error)
        try {
          r.error(e);
        } catch (n) {
          zo(n);
        }
      else zo(e);
    }
    complete() {
      let { partialObserver: e } = this;
      if (e.complete)
        try {
          e.complete();
        } catch (r) {
          zo(r);
        }
    }
  },
  sn = class extends Xn {
    constructor(e, r, n) {
      super();
      let i;
      if (P(e) || !e)
        i = { next: e ?? void 0, error: r ?? void 0, complete: n ?? void 0 };
      else {
        let o;
        this && _t.useDeprecatedNextContext
          ? ((o = Object.create(e)),
            (o.unsubscribe = () => this.unsubscribe()),
            (i = {
              next: e.next && Wl(e.next, o),
              error: e.error && Wl(e.error, o),
              complete: e.complete && Wl(e.complete, o),
            }))
          : (i = e);
      }
      this.destination = new ql(i);
    }
  };
function zo(t) {
  _t.useDeprecatedSynchronousErrorHandling ? uh(t) : Ho(t);
}
function j0(t) {
  throw t;
}
function Gl(t, e) {
  let { onStoppedNotification: r } = _t;
  r && _r.setTimeout(() => r(t, e));
}
var B0 = { closed: !0, next: Ei, error: j0, complete: Ei };
var Mr = (typeof Symbol == "function" && Symbol.observable) || "@@observable";
function We(t) {
  return t;
}
function Zl(...t) {
  return Ql(t);
}
function Ql(t) {
  return t.length === 0
    ? We
    : t.length === 1
    ? t[0]
    : function (r) {
        return t.reduce((n, i) => i(n), r);
      };
}
var H = (() => {
  class t {
    constructor(r) {
      r && (this._subscribe = r);
    }
    lift(r) {
      let n = new t();
      return (n.source = this), (n.operator = r), n;
    }
    subscribe(r, n, i) {
      let o = U0(r) ? r : new sn(r, n, i);
      return (
        Sr(() => {
          let { operator: s, source: a } = this;
          o.add(
            s ? s.call(o, a) : a ? this._subscribe(o) : this._trySubscribe(o)
          );
        }),
        o
      );
    }
    _trySubscribe(r) {
      try {
        return this._subscribe(r);
      } catch (n) {
        r.error(n);
      }
    }
    forEach(r, n) {
      return (
        (n = dh(n)),
        new n((i, o) => {
          let s = new sn({
            next: (a) => {
              try {
                r(a);
              } catch (l) {
                o(l), s.unsubscribe();
              }
            },
            error: o,
            complete: i,
          });
          this.subscribe(s);
        })
      );
    }
    _subscribe(r) {
      var n;
      return (n = this.source) === null || n === void 0
        ? void 0
        : n.subscribe(r);
    }
    [Mr]() {
      return this;
    }
    pipe(...r) {
      return Ql(r)(this);
    }
    toPromise(r) {
      return (
        (r = dh(r)),
        new r((n, i) => {
          let o;
          this.subscribe(
            (s) => (o = s),
            (s) => i(s),
            () => n(o)
          );
        })
      );
    }
  }
  return (t.create = (e) => new t(e)), t;
})();
function dh(t) {
  var e;
  return (e = t ?? _t.Promise) !== null && e !== void 0 ? e : Promise;
}
function $0(t) {
  return t && P(t.next) && P(t.error) && P(t.complete);
}
function U0(t) {
  return (t && t instanceof Xn) || ($0(t) && Uo(t));
}
function Yl(t) {
  return P(t?.lift);
}
function j(t) {
  return (e) => {
    if (Yl(e))
      return e.lift(function (r) {
        try {
          return t(r, this);
        } catch (n) {
          this.error(n);
        }
      });
    throw new TypeError("Unable to lift unknown Observable type");
  };
}
function B(t, e, r, n, i) {
  return new Kl(t, e, r, n, i);
}
var Kl = class extends Xn {
  constructor(e, r, n, i, o, s) {
    super(e),
      (this.onFinalize = o),
      (this.shouldUnsubscribe = s),
      (this._next = r
        ? function (a) {
            try {
              r(a);
            } catch (l) {
              e.error(l);
            }
          }
        : super._next),
      (this._error = i
        ? function (a) {
            try {
              i(a);
            } catch (l) {
              e.error(l);
            } finally {
              this.unsubscribe();
            }
          }
        : super._error),
      (this._complete = n
        ? function () {
            try {
              n();
            } catch (a) {
              e.error(a);
            } finally {
              this.unsubscribe();
            }
          }
        : super._complete);
  }
  unsubscribe() {
    var e;
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      let { closed: r } = this;
      super.unsubscribe(),
        !r && ((e = this.onFinalize) === null || e === void 0 || e.call(this));
    }
  }
};
function xr() {
  return j((t, e) => {
    let r = null;
    t._refCount++;
    let n = B(e, void 0, void 0, void 0, () => {
      if (!t || t._refCount <= 0 || 0 < --t._refCount) {
        r = null;
        return;
      }
      let i = t._connection,
        o = r;
      (r = null), i && (!o || i === o) && i.unsubscribe(), e.unsubscribe();
    });
    t.subscribe(n), n.closed || (r = t.connect());
  });
}
var Tr = class extends H {
  constructor(e, r) {
    super(),
      (this.source = e),
      (this.subjectFactory = r),
      (this._subject = null),
      (this._refCount = 0),
      (this._connection = null),
      Yl(e) && (this.lift = e.lift);
  }
  _subscribe(e) {
    return this.getSubject().subscribe(e);
  }
  getSubject() {
    let e = this._subject;
    return (
      (!e || e.isStopped) && (this._subject = this.subjectFactory()),
      this._subject
    );
  }
  _teardown() {
    this._refCount = 0;
    let { _connection: e } = this;
    (this._subject = this._connection = null), e?.unsubscribe();
  }
  connect() {
    let e = this._connection;
    if (!e) {
      e = this._connection = new De();
      let r = this.getSubject();
      e.add(
        this.source.subscribe(
          B(
            r,
            void 0,
            () => {
              this._teardown(), r.complete();
            },
            (n) => {
              this._teardown(), r.error(n);
            },
            () => this._teardown()
          )
        )
      ),
        e.closed && ((this._connection = null), (e = De.EMPTY));
    }
    return e;
  }
  refCount() {
    return xr()(this);
  }
};
var fh = Ir(
  (t) =>
    function () {
      t(this),
        (this.name = "ObjectUnsubscribedError"),
        (this.message = "object unsubscribed");
    }
);
var me = (() => {
    class t extends H {
      constructor() {
        super(),
          (this.closed = !1),
          (this.currentObservers = null),
          (this.observers = []),
          (this.isStopped = !1),
          (this.hasError = !1),
          (this.thrownError = null);
      }
      lift(r) {
        let n = new Wo(this, this);
        return (n.operator = r), n;
      }
      _throwIfClosed() {
        if (this.closed) throw new fh();
      }
      next(r) {
        Sr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.currentObservers ||
              (this.currentObservers = Array.from(this.observers));
            for (let n of this.currentObservers) n.next(r);
          }
        });
      }
      error(r) {
        Sr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            (this.hasError = this.isStopped = !0), (this.thrownError = r);
            let { observers: n } = this;
            for (; n.length; ) n.shift().error(r);
          }
        });
      }
      complete() {
        Sr(() => {
          if ((this._throwIfClosed(), !this.isStopped)) {
            this.isStopped = !0;
            let { observers: r } = this;
            for (; r.length; ) r.shift().complete();
          }
        });
      }
      unsubscribe() {
        (this.isStopped = this.closed = !0),
          (this.observers = this.currentObservers = null);
      }
      get observed() {
        var r;
        return (
          ((r = this.observers) === null || r === void 0 ? void 0 : r.length) >
          0
        );
      }
      _trySubscribe(r) {
        return this._throwIfClosed(), super._trySubscribe(r);
      }
      _subscribe(r) {
        return (
          this._throwIfClosed(),
          this._checkFinalizedStatuses(r),
          this._innerSubscribe(r)
        );
      }
      _innerSubscribe(r) {
        let { hasError: n, isStopped: i, observers: o } = this;
        return n || i
          ? Hl
          : ((this.currentObservers = null),
            o.push(r),
            new De(() => {
              (this.currentObservers = null), Yn(o, r);
            }));
      }
      _checkFinalizedStatuses(r) {
        let { hasError: n, thrownError: i, isStopped: o } = this;
        n ? r.error(i) : o && r.complete();
      }
      asObservable() {
        let r = new H();
        return (r.source = this), r;
      }
    }
    return (t.create = (e, r) => new Wo(e, r)), t;
  })(),
  Wo = class extends me {
    constructor(e, r) {
      super(), (this.destination = e), (this.source = r);
    }
    next(e) {
      var r, n;
      (n =
        (r = this.destination) === null || r === void 0 ? void 0 : r.next) ===
        null ||
        n === void 0 ||
        n.call(r, e);
    }
    error(e) {
      var r, n;
      (n =
        (r = this.destination) === null || r === void 0 ? void 0 : r.error) ===
        null ||
        n === void 0 ||
        n.call(r, e);
    }
    complete() {
      var e, r;
      (r =
        (e = this.destination) === null || e === void 0
          ? void 0
          : e.complete) === null ||
        r === void 0 ||
        r.call(e);
    }
    _subscribe(e) {
      var r, n;
      return (n =
        (r = this.source) === null || r === void 0
          ? void 0
          : r.subscribe(e)) !== null && n !== void 0
        ? n
        : Hl;
    }
  };
var we = class extends me {
  constructor(e) {
    super(), (this._value = e);
  }
  get value() {
    return this.getValue();
  }
  _subscribe(e) {
    let r = super._subscribe(e);
    return !r.closed && e.next(this._value), r;
  }
  getValue() {
    let { hasError: e, thrownError: r, _value: n } = this;
    if (e) throw r;
    return this._throwIfClosed(), n;
  }
  next(e) {
    super.next((this._value = e));
  }
};
var Ii = {
  now() {
    return (Ii.delegate || Date).now();
  },
  delegate: void 0,
};
var Go = class extends me {
  constructor(e = 1 / 0, r = 1 / 0, n = Ii) {
    super(),
      (this._bufferSize = e),
      (this._windowTime = r),
      (this._timestampProvider = n),
      (this._buffer = []),
      (this._infiniteTimeWindow = !0),
      (this._infiniteTimeWindow = r === 1 / 0),
      (this._bufferSize = Math.max(1, e)),
      (this._windowTime = Math.max(1, r));
  }
  next(e) {
    let {
      isStopped: r,
      _buffer: n,
      _infiniteTimeWindow: i,
      _timestampProvider: o,
      _windowTime: s,
    } = this;
    r || (n.push(e), !i && n.push(o.now() + s)),
      this._trimBuffer(),
      super.next(e);
  }
  _subscribe(e) {
    this._throwIfClosed(), this._trimBuffer();
    let r = this._innerSubscribe(e),
      { _infiniteTimeWindow: n, _buffer: i } = this,
      o = i.slice();
    for (let s = 0; s < o.length && !e.closed; s += n ? 1 : 2) e.next(o[s]);
    return this._checkFinalizedStatuses(e), r;
  }
  _trimBuffer() {
    let {
        _bufferSize: e,
        _timestampProvider: r,
        _buffer: n,
        _infiniteTimeWindow: i,
      } = this,
      o = (i ? 1 : 2) * e;
    if ((e < 1 / 0 && o < n.length && n.splice(0, n.length - o), !i)) {
      let s = r.now(),
        a = 0;
      for (let l = 1; l < n.length && n[l] <= s; l += 2) a = l;
      a && n.splice(0, a + 1);
    }
  }
};
var qo = class extends De {
  constructor(e, r) {
    super();
  }
  schedule(e, r = 0) {
    return this;
  }
};
var _i = {
  setInterval(t, e, ...r) {
    let { delegate: n } = _i;
    return n?.setInterval ? n.setInterval(t, e, ...r) : setInterval(t, e, ...r);
  },
  clearInterval(t) {
    let { delegate: e } = _i;
    return (e?.clearInterval || clearInterval)(t);
  },
  delegate: void 0,
};
var Zo = class extends qo {
  constructor(e, r) {
    super(e, r), (this.scheduler = e), (this.work = r), (this.pending = !1);
  }
  schedule(e, r = 0) {
    var n;
    if (this.closed) return this;
    this.state = e;
    let i = this.id,
      o = this.scheduler;
    return (
      i != null && (this.id = this.recycleAsyncId(o, i, r)),
      (this.pending = !0),
      (this.delay = r),
      (this.id =
        (n = this.id) !== null && n !== void 0
          ? n
          : this.requestAsyncId(o, this.id, r)),
      this
    );
  }
  requestAsyncId(e, r, n = 0) {
    return _i.setInterval(e.flush.bind(e, this), n);
  }
  recycleAsyncId(e, r, n = 0) {
    if (n != null && this.delay === n && this.pending === !1) return r;
    r != null && _i.clearInterval(r);
  }
  execute(e, r) {
    if (this.closed) return new Error("executing a cancelled action");
    this.pending = !1;
    let n = this._execute(e, r);
    if (n) return n;
    this.pending === !1 &&
      this.id != null &&
      (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
  }
  _execute(e, r) {
    let n = !1,
      i;
    try {
      this.work(e);
    } catch (o) {
      (n = !0), (i = o || new Error("Scheduled action threw falsy error"));
    }
    if (n) return this.unsubscribe(), i;
  }
  unsubscribe() {
    if (!this.closed) {
      let { id: e, scheduler: r } = this,
        { actions: n } = r;
      (this.work = this.state = this.scheduler = null),
        (this.pending = !1),
        Yn(n, this),
        e != null && (this.id = this.recycleAsyncId(r, e, null)),
        (this.delay = null),
        super.unsubscribe();
    }
  }
};
var Ar = class t {
  constructor(e, r = t.now) {
    (this.schedulerActionCtor = e), (this.now = r);
  }
  schedule(e, r = 0, n) {
    return new this.schedulerActionCtor(this, e).schedule(n, r);
  }
};
Ar.now = Ii.now;
var Qo = class extends Ar {
  constructor(e, r = Ar.now) {
    super(e, r), (this.actions = []), (this._active = !1);
  }
  flush(e) {
    let { actions: r } = this;
    if (this._active) {
      r.push(e);
      return;
    }
    let n;
    this._active = !0;
    do if ((n = e.execute(e.state, e.delay))) break;
    while ((e = r.shift()));
    if (((this._active = !1), n)) {
      for (; (e = r.shift()); ) e.unsubscribe();
      throw n;
    }
  }
};
var H0 = new Qo(Zo),
  hh = H0;
var Ge = new H((t) => t.complete());
function Yo(t) {
  return t && P(t.schedule);
}
function Xl(t) {
  return t[t.length - 1];
}
function Ko(t) {
  return P(Xl(t)) ? t.pop() : void 0;
}
function Bt(t) {
  return Yo(Xl(t)) ? t.pop() : void 0;
}
function ph(t, e) {
  return typeof Xl(t) == "number" ? t.pop() : e;
}
function mh(t, e, r, n) {
  function i(o) {
    return o instanceof r
      ? o
      : new r(function (s) {
          s(o);
        });
  }
  return new (r || (r = Promise))(function (o, s) {
    function a(u) {
      try {
        c(n.next(u));
      } catch (d) {
        s(d);
      }
    }
    function l(u) {
      try {
        c(n.throw(u));
      } catch (d) {
        s(d);
      }
    }
    function c(u) {
      u.done ? o(u.value) : i(u.value).then(a, l);
    }
    c((n = n.apply(t, e || [])).next());
  });
}
function gh(t) {
  var e = typeof Symbol == "function" && Symbol.iterator,
    r = e && t[e],
    n = 0;
  if (r) return r.call(t);
  if (t && typeof t.length == "number")
    return {
      next: function () {
        return (
          t && n >= t.length && (t = void 0), { value: t && t[n++], done: !t }
        );
      },
    };
  throw new TypeError(
    e ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function Jn(t) {
  return this instanceof Jn ? ((this.v = t), this) : new Jn(t);
}
function yh(t, e, r) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var n = r.apply(t, e || []),
    i,
    o = [];
  return (
    (i = {}),
    s("next"),
    s("throw"),
    s("return"),
    (i[Symbol.asyncIterator] = function () {
      return this;
    }),
    i
  );
  function s(f) {
    n[f] &&
      (i[f] = function (g) {
        return new Promise(function (C, I) {
          o.push([f, g, C, I]) > 1 || a(f, g);
        });
      });
  }
  function a(f, g) {
    try {
      l(n[f](g));
    } catch (C) {
      d(o[0][3], C);
    }
  }
  function l(f) {
    f.value instanceof Jn
      ? Promise.resolve(f.value.v).then(c, u)
      : d(o[0][2], f);
  }
  function c(f) {
    a("next", f);
  }
  function u(f) {
    a("throw", f);
  }
  function d(f, g) {
    f(g), o.shift(), o.length && a(o[0][0], o[0][1]);
  }
}
function vh(t) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var e = t[Symbol.asyncIterator],
    r;
  return e
    ? e.call(t)
    : ((t = typeof gh == "function" ? gh(t) : t[Symbol.iterator]()),
      (r = {}),
      n("next"),
      n("throw"),
      n("return"),
      (r[Symbol.asyncIterator] = function () {
        return this;
      }),
      r);
  function n(o) {
    r[o] =
      t[o] &&
      function (s) {
        return new Promise(function (a, l) {
          (s = t[o](s)), i(a, l, s.done, s.value);
        });
      };
  }
  function i(o, s, a, l) {
    Promise.resolve(l).then(function (c) {
      o({ value: c, done: a });
    }, s);
  }
}
var Xo = (t) => t && typeof t.length == "number" && typeof t != "function";
function Jo(t) {
  return P(t?.then);
}
function es(t) {
  return P(t[Mr]);
}
function ts(t) {
  return Symbol.asyncIterator && P(t?.[Symbol.asyncIterator]);
}
function ns(t) {
  return new TypeError(
    `You provided ${
      t !== null && typeof t == "object" ? "an invalid object" : `'${t}'`
    } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
  );
}
function z0() {
  return typeof Symbol != "function" || !Symbol.iterator
    ? "@@iterator"
    : Symbol.iterator;
}
var rs = z0();
function is(t) {
  return P(t?.[rs]);
}
function os(t) {
  return yh(this, arguments, function* () {
    let r = t.getReader();
    try {
      for (;;) {
        let { value: n, done: i } = yield Jn(r.read());
        if (i) return yield Jn(void 0);
        yield yield Jn(n);
      }
    } finally {
      r.releaseLock();
    }
  });
}
function ss(t) {
  return P(t?.getReader);
}
function he(t) {
  if (t instanceof H) return t;
  if (t != null) {
    if (es(t)) return W0(t);
    if (Xo(t)) return G0(t);
    if (Jo(t)) return q0(t);
    if (ts(t)) return Dh(t);
    if (is(t)) return Z0(t);
    if (ss(t)) return Q0(t);
  }
  throw ns(t);
}
function W0(t) {
  return new H((e) => {
    let r = t[Mr]();
    if (P(r.subscribe)) return r.subscribe(e);
    throw new TypeError(
      "Provided object does not correctly implement Symbol.observable"
    );
  });
}
function G0(t) {
  return new H((e) => {
    for (let r = 0; r < t.length && !e.closed; r++) e.next(t[r]);
    e.complete();
  });
}
function q0(t) {
  return new H((e) => {
    t.then(
      (r) => {
        e.closed || (e.next(r), e.complete());
      },
      (r) => e.error(r)
    ).then(null, Ho);
  });
}
function Z0(t) {
  return new H((e) => {
    for (let r of t) if ((e.next(r), e.closed)) return;
    e.complete();
  });
}
function Dh(t) {
  return new H((e) => {
    Y0(t, e).catch((r) => e.error(r));
  });
}
function Q0(t) {
  return Dh(os(t));
}
function Y0(t, e) {
  var r, n, i, o;
  return mh(this, void 0, void 0, function* () {
    try {
      for (r = vh(t); (n = yield r.next()), !n.done; ) {
        let s = n.value;
        if ((e.next(s), e.closed)) return;
      }
    } catch (s) {
      i = { error: s };
    } finally {
      try {
        n && !n.done && (o = r.return) && (yield o.call(r));
      } finally {
        if (i) throw i.error;
      }
    }
    e.complete();
  });
}
function Je(t, e, r, n = 0, i = !1) {
  let o = e.schedule(function () {
    r(), i ? t.add(this.schedule(null, n)) : this.unsubscribe();
  }, n);
  if ((t.add(o), !i)) return o;
}
function as(t, e = 0) {
  return j((r, n) => {
    r.subscribe(
      B(
        n,
        (i) => Je(n, t, () => n.next(i), e),
        () => Je(n, t, () => n.complete(), e),
        (i) => Je(n, t, () => n.error(i), e)
      )
    );
  });
}
function ls(t, e = 0) {
  return j((r, n) => {
    n.add(t.schedule(() => r.subscribe(n), e));
  });
}
function wh(t, e) {
  return he(t).pipe(ls(e), as(e));
}
function bh(t, e) {
  return he(t).pipe(ls(e), as(e));
}
function Ch(t, e) {
  return new H((r) => {
    let n = 0;
    return e.schedule(function () {
      n === t.length
        ? r.complete()
        : (r.next(t[n++]), r.closed || this.schedule());
    });
  });
}
function Eh(t, e) {
  return new H((r) => {
    let n;
    return (
      Je(r, e, () => {
        (n = t[rs]()),
          Je(
            r,
            e,
            () => {
              let i, o;
              try {
                ({ value: i, done: o } = n.next());
              } catch (s) {
                r.error(s);
                return;
              }
              o ? r.complete() : r.next(i);
            },
            0,
            !0
          );
      }),
      () => P(n?.return) && n.return()
    );
  });
}
function cs(t, e) {
  if (!t) throw new Error("Iterable cannot be null");
  return new H((r) => {
    Je(r, e, () => {
      let n = t[Symbol.asyncIterator]();
      Je(
        r,
        e,
        () => {
          n.next().then((i) => {
            i.done ? r.complete() : r.next(i.value);
          });
        },
        0,
        !0
      );
    });
  });
}
function Ih(t, e) {
  return cs(os(t), e);
}
function _h(t, e) {
  if (t != null) {
    if (es(t)) return wh(t, e);
    if (Xo(t)) return Ch(t, e);
    if (Jo(t)) return bh(t, e);
    if (ts(t)) return cs(t, e);
    if (is(t)) return Eh(t, e);
    if (ss(t)) return Ih(t, e);
  }
  throw ns(t);
}
function ae(t, e) {
  return e ? _h(t, e) : he(t);
}
function A(...t) {
  let e = Bt(t);
  return ae(t, e);
}
function Nr(t, e) {
  let r = P(t) ? t : () => t,
    n = (i) => i.error(r());
  return new H(e ? (i) => e.schedule(n, 0, i) : n);
}
function Jl(t) {
  return !!t && (t instanceof H || (P(t.lift) && P(t.subscribe)));
}
var an = Ir(
  (t) =>
    function () {
      t(this),
        (this.name = "EmptyError"),
        (this.message = "no elements in sequence");
    }
);
function Sh(t) {
  return t instanceof Date && !isNaN(t);
}
function k(t, e) {
  return j((r, n) => {
    let i = 0;
    r.subscribe(
      B(n, (o) => {
        n.next(t.call(e, o, i++));
      })
    );
  });
}
var { isArray: K0 } = Array;
function X0(t, e) {
  return K0(e) ? t(...e) : t(e);
}
function us(t) {
  return k((e) => X0(t, e));
}
var { isArray: J0 } = Array,
  { getPrototypeOf: eD, prototype: tD, keys: nD } = Object;
function ds(t) {
  if (t.length === 1) {
    let e = t[0];
    if (J0(e)) return { args: e, keys: null };
    if (rD(e)) {
      let r = nD(e);
      return { args: r.map((n) => e[n]), keys: r };
    }
  }
  return { args: t, keys: null };
}
function rD(t) {
  return t && typeof t == "object" && eD(t) === tD;
}
function fs(t, e) {
  return t.reduce((r, n, i) => ((r[n] = e[i]), r), {});
}
function Si(...t) {
  let e = Bt(t),
    r = Ko(t),
    { args: n, keys: i } = ds(t);
  if (n.length === 0) return ae([], e);
  let o = new H(iD(n, e, i ? (s) => fs(i, s) : We));
  return r ? o.pipe(us(r)) : o;
}
function iD(t, e, r = We) {
  return (n) => {
    Mh(
      e,
      () => {
        let { length: i } = t,
          o = new Array(i),
          s = i,
          a = i;
        for (let l = 0; l < i; l++)
          Mh(
            e,
            () => {
              let c = ae(t[l], e),
                u = !1;
              c.subscribe(
                B(
                  n,
                  (d) => {
                    (o[l] = d), u || ((u = !0), a--), a || n.next(r(o.slice()));
                  },
                  () => {
                    --s || n.complete();
                  }
                )
              );
            },
            n
          );
      },
      n
    );
  };
}
function Mh(t, e, r) {
  t ? Je(r, t, e) : e();
}
function xh(t, e, r, n, i, o, s, a) {
  let l = [],
    c = 0,
    u = 0,
    d = !1,
    f = () => {
      d && !l.length && !c && e.complete();
    },
    g = (I) => (c < n ? C(I) : l.push(I)),
    C = (I) => {
      o && e.next(I), c++;
      let x = !1;
      he(r(I, u++)).subscribe(
        B(
          e,
          (M) => {
            i?.(M), o ? g(M) : e.next(M);
          },
          () => {
            x = !0;
          },
          void 0,
          () => {
            if (x)
              try {
                for (c--; l.length && c < n; ) {
                  let M = l.shift();
                  s ? Je(e, s, () => C(M)) : C(M);
                }
                f();
              } catch (M) {
                e.error(M);
              }
          }
        )
      );
    };
  return (
    t.subscribe(
      B(e, g, () => {
        (d = !0), f();
      })
    ),
    () => {
      a?.();
    }
  );
}
function _e(t, e, r = 1 / 0) {
  return P(e)
    ? _e((n, i) => k((o, s) => e(n, o, i, s))(he(t(n, i))), r)
    : (typeof e == "number" && (r = e), j((n, i) => xh(n, i, t, r)));
}
function Sn(t = 1 / 0) {
  return _e(We, t);
}
function Th() {
  return Sn(1);
}
function Rr(...t) {
  return Th()(ae(t, Bt(t)));
}
function hs(t) {
  return new H((e) => {
    he(t()).subscribe(e);
  });
}
function ec(...t) {
  let e = Ko(t),
    { args: r, keys: n } = ds(t),
    i = new H((o) => {
      let { length: s } = r;
      if (!s) {
        o.complete();
        return;
      }
      let a = new Array(s),
        l = s,
        c = s;
      for (let u = 0; u < s; u++) {
        let d = !1;
        he(r[u]).subscribe(
          B(
            o,
            (f) => {
              d || ((d = !0), c--), (a[u] = f);
            },
            () => l--,
            void 0,
            () => {
              (!l || !d) && (c || o.next(n ? fs(n, a) : a), o.complete());
            }
          )
        );
      }
    });
  return e ? i.pipe(us(e)) : i;
}
function tc(t = 0, e, r = hh) {
  let n = -1;
  return (
    e != null && (Yo(e) ? (r = e) : (n = e)),
    new H((i) => {
      let o = Sh(t) ? +t - r.now() : t;
      o < 0 && (o = 0);
      let s = 0;
      return r.schedule(function () {
        i.closed ||
          (i.next(s++), 0 <= n ? this.schedule(void 0, n) : i.complete());
      }, o);
    })
  );
}
function nc(...t) {
  let e = Bt(t),
    r = ph(t, 1 / 0),
    n = t;
  return n.length ? (n.length === 1 ? he(n[0]) : Sn(r)(ae(n, e))) : Ge;
}
function et(t, e) {
  return j((r, n) => {
    let i = 0;
    r.subscribe(B(n, (o) => t.call(e, o, i++) && n.next(o)));
  });
}
function Mn(t) {
  return j((e, r) => {
    let n = null,
      i = !1,
      o;
    (n = e.subscribe(
      B(r, void 0, void 0, (s) => {
        (o = he(t(s, Mn(t)(e)))),
          n ? (n.unsubscribe(), (n = null), o.subscribe(r)) : (i = !0);
      })
    )),
      i && (n.unsubscribe(), (n = null), o.subscribe(r));
  });
}
function Ah(t, e, r, n, i) {
  return (o, s) => {
    let a = r,
      l = e,
      c = 0;
    o.subscribe(
      B(
        s,
        (u) => {
          let d = c++;
          (l = a ? t(l, u, d) : ((a = !0), u)), n && s.next(l);
        },
        i &&
          (() => {
            a && s.next(l), s.complete();
          })
      )
    );
  };
}
function ln(t, e) {
  return P(e) ? _e(t, e, 1) : _e(t, 1);
}
function xn(t) {
  return j((e, r) => {
    let n = !1;
    e.subscribe(
      B(
        r,
        (i) => {
          (n = !0), r.next(i);
        },
        () => {
          n || r.next(t), r.complete();
        }
      )
    );
  });
}
function cn(t) {
  return t <= 0
    ? () => Ge
    : j((e, r) => {
        let n = 0;
        e.subscribe(
          B(r, (i) => {
            ++n <= t && (r.next(i), t <= n && r.complete());
          })
        );
      });
}
function Mi(t) {
  return k(() => t);
}
function rc(t, e = We) {
  return (
    (t = t ?? oD),
    j((r, n) => {
      let i,
        o = !0;
      r.subscribe(
        B(n, (s) => {
          let a = e(s);
          (o || !t(i, a)) && ((o = !1), (i = a), n.next(s));
        })
      );
    })
  );
}
function oD(t, e) {
  return t === e;
}
function ps(t = sD) {
  return j((e, r) => {
    let n = !1;
    e.subscribe(
      B(
        r,
        (i) => {
          (n = !0), r.next(i);
        },
        () => (n ? r.complete() : r.error(t()))
      )
    );
  });
}
function sD() {
  return new an();
}
function Tn(t) {
  return j((e, r) => {
    try {
      e.subscribe(r);
    } finally {
      r.add(t);
    }
  });
}
function St(t, e) {
  let r = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? et((i, o) => t(i, o, n)) : We,
      cn(1),
      r ? xn(e) : ps(() => new an())
    );
}
function Or(t) {
  return t <= 0
    ? () => Ge
    : j((e, r) => {
        let n = [];
        e.subscribe(
          B(
            r,
            (i) => {
              n.push(i), t < n.length && n.shift();
            },
            () => {
              for (let i of n) r.next(i);
              r.complete();
            },
            void 0,
            () => {
              n = null;
            }
          )
        );
      });
}
function ic(t, e) {
  let r = arguments.length >= 2;
  return (n) =>
    n.pipe(
      t ? et((i, o) => t(i, o, n)) : We,
      Or(1),
      r ? xn(e) : ps(() => new an())
    );
}
function oc(t, e) {
  return j(Ah(t, e, arguments.length >= 2, !0));
}
function Nh(t = {}) {
  let {
    connector: e = () => new me(),
    resetOnError: r = !0,
    resetOnComplete: n = !0,
    resetOnRefCountZero: i = !0,
  } = t;
  return (o) => {
    let s,
      a,
      l,
      c = 0,
      u = !1,
      d = !1,
      f = () => {
        a?.unsubscribe(), (a = void 0);
      },
      g = () => {
        f(), (s = l = void 0), (u = d = !1);
      },
      C = () => {
        let I = s;
        g(), I?.unsubscribe();
      };
    return j((I, x) => {
      c++, !d && !u && f();
      let M = (l = l ?? e());
      x.add(() => {
        c--, c === 0 && !d && !u && (a = sc(C, i));
      }),
        M.subscribe(x),
        !s &&
          c > 0 &&
          ((s = new sn({
            next: (ge) => M.next(ge),
            error: (ge) => {
              (d = !0), f(), (a = sc(g, r, ge)), M.error(ge);
            },
            complete: () => {
              (u = !0), f(), (a = sc(g, n)), M.complete();
            },
          })),
          he(I).subscribe(s));
    })(o);
  };
}
function sc(t, e, ...r) {
  if (e === !0) {
    t();
    return;
  }
  if (e === !1) return;
  let n = new sn({
    next: () => {
      n.unsubscribe(), t();
    },
  });
  return he(e(...r)).subscribe(n);
}
function ac(t, e, r) {
  let n,
    i = !1;
  return (
    t && typeof t == "object"
      ? ({
          bufferSize: n = 1 / 0,
          windowTime: e = 1 / 0,
          refCount: i = !1,
          scheduler: r,
        } = t)
      : (n = t ?? 1 / 0),
    Nh({
      connector: () => new Go(n, e, r),
      resetOnError: !0,
      resetOnComplete: !1,
      resetOnRefCountZero: i,
    })
  );
}
function xi(...t) {
  let e = Bt(t);
  return j((r, n) => {
    (e ? Rr(t, r, e) : Rr(t, r)).subscribe(n);
  });
}
function Be(t, e) {
  return j((r, n) => {
    let i = null,
      o = 0,
      s = !1,
      a = () => s && !i && n.complete();
    r.subscribe(
      B(
        n,
        (l) => {
          i?.unsubscribe();
          let c = 0,
            u = o++;
          he(t(l, u)).subscribe(
            (i = B(
              n,
              (d) => n.next(e ? e(l, d, u, c++) : d),
              () => {
                (i = null), a();
              }
            ))
          );
        },
        () => {
          (s = !0), a();
        }
      )
    );
  });
}
function Ti(t) {
  return j((e, r) => {
    he(t).subscribe(B(r, () => r.complete(), Ei)), !r.closed && e.subscribe(r);
  });
}
function Ae(t, e, r) {
  let n = P(t) || e || r ? { next: t, error: e, complete: r } : t;
  return n
    ? j((i, o) => {
        var s;
        (s = n.subscribe) === null || s === void 0 || s.call(n);
        let a = !0;
        i.subscribe(
          B(
            o,
            (l) => {
              var c;
              (c = n.next) === null || c === void 0 || c.call(n, l), o.next(l);
            },
            () => {
              var l;
              (a = !1),
                (l = n.complete) === null || l === void 0 || l.call(n),
                o.complete();
            },
            (l) => {
              var c;
              (a = !1),
                (c = n.error) === null || c === void 0 || c.call(n, l),
                o.error(l);
            },
            () => {
              var l, c;
              a && ((l = n.unsubscribe) === null || l === void 0 || l.call(n)),
                (c = n.finalize) === null || c === void 0 || c.call(n);
            }
          )
        );
      })
    : We;
}
var bp = "https://g.co/ng/security#xss",
  _ = class extends Error {
    constructor(e, r) {
      super(Qs(e, r)), (this.code = e);
    }
  };
function Qs(t, e) {
  return `${`NG0${Math.abs(t)}`}${e ? ": " + e : ""}`;
}
function Hi(t) {
  return { toString: t }.toString();
}
var gs = "__parameters__";
function aD(t) {
  return function (...r) {
    if (t) {
      let n = t(...r);
      for (let i in n) this[i] = n[i];
    }
  };
}
function Cp(t, e, r) {
  return Hi(() => {
    let n = aD(e);
    function i(...o) {
      if (this instanceof i) return n.apply(this, o), this;
      let s = new i(...o);
      return (a.annotation = s), a;
      function a(l, c, u) {
        let d = l.hasOwnProperty(gs)
          ? l[gs]
          : Object.defineProperty(l, gs, { value: [] })[gs];
        for (; d.length <= u; ) d.push(null);
        return (d[u] = d[u] || []).push(s), l;
      }
    }
    return (
      r && (i.prototype = Object.create(r.prototype)),
      (i.prototype.ngMetadataName = t),
      (i.annotationCls = i),
      i
    );
  });
}
var be = globalThis;
function le(t) {
  for (let e in t) if (t[e] === le) return e;
  throw Error("Could not find renamed property on target object.");
}
function lD(t, e) {
  for (let r in e) e.hasOwnProperty(r) && !t.hasOwnProperty(r) && (t[r] = e[r]);
}
function Ze(t) {
  if (typeof t == "string") return t;
  if (Array.isArray(t)) return "[" + t.map(Ze).join(", ") + "]";
  if (t == null) return "" + t;
  if (t.overriddenName) return `${t.overriddenName}`;
  if (t.name) return `${t.name}`;
  let e = t.toString();
  if (e == null) return "" + e;
  let r = e.indexOf(`
`);
  return r === -1 ? e : e.substring(0, r);
}
function Rh(t, e) {
  return t == null || t === ""
    ? e === null
      ? ""
      : e
    : e == null || e === ""
    ? t
    : t + " " + e;
}
var cD = le({ __forward_ref__: le });
function hn(t) {
  return (
    (t.__forward_ref__ = hn),
    (t.toString = function () {
      return Ze(this());
    }),
    t
  );
}
function qe(t) {
  return Ep(t) ? t() : t;
}
function Ep(t) {
  return (
    typeof t == "function" && t.hasOwnProperty(cD) && t.__forward_ref__ === hn
  );
}
function E(t) {
  return {
    token: t.token,
    providedIn: t.providedIn || null,
    factory: t.factory,
    value: void 0,
  };
}
function Ne(t) {
  return { providers: t.providers || [], imports: t.imports || [] };
}
function Ys(t) {
  return Oh(t, _p) || Oh(t, Sp);
}
function Ip(t) {
  return Ys(t) !== null;
}
function Oh(t, e) {
  return t.hasOwnProperty(e) ? t[e] : null;
}
function uD(t) {
  let e = t && (t[_p] || t[Sp]);
  return e || null;
}
function kh(t) {
  return t && (t.hasOwnProperty(Ph) || t.hasOwnProperty(dD)) ? t[Ph] : null;
}
var _p = le({ ɵprov: le }),
  Ph = le({ ɵinj: le }),
  Sp = le({ ngInjectableDef: le }),
  dD = le({ ngInjectorDef: le }),
  S = class {
    constructor(e, r) {
      (this._desc = e),
        (this.ngMetadataName = "InjectionToken"),
        (this.ɵprov = void 0),
        typeof r == "number"
          ? (this.__NG_ELEMENT_ID__ = r)
          : r !== void 0 &&
            (this.ɵprov = E({
              token: this,
              providedIn: r.providedIn || "root",
              factory: r.factory,
            }));
    }
    get multi() {
      return this;
    }
    toString() {
      return `InjectionToken ${this._desc}`;
    }
  };
function Mp(t) {
  return t && !!t.ɵproviders;
}
var fD = le({ ɵcmp: le }),
  hD = le({ ɵdir: le }),
  pD = le({ ɵpipe: le }),
  gD = le({ ɵmod: le }),
  xs = le({ ɵfac: le }),
  Ai = le({ __NG_ELEMENT_ID__: le }),
  Fh = le({ __NG_ENV_ID__: le });
function Ks(t) {
  return typeof t == "string" ? t : t == null ? "" : String(t);
}
function mD(t) {
  return typeof t == "function"
    ? t.name || t.toString()
    : typeof t == "object" && t != null && typeof t.type == "function"
    ? t.type.name || t.type.toString()
    : Ks(t);
}
function yD(t, e) {
  let r = e ? `. Dependency path: ${e.join(" > ")} > ${t}` : "";
  throw new _(-200, t);
}
function Iu(t, e) {
  throw new _(-201, !1);
}
var $ = (function (t) {
    return (
      (t[(t.Default = 0)] = "Default"),
      (t[(t.Host = 1)] = "Host"),
      (t[(t.Self = 2)] = "Self"),
      (t[(t.SkipSelf = 4)] = "SkipSelf"),
      (t[(t.Optional = 8)] = "Optional"),
      t
    );
  })($ || {}),
  Ec;
function xp() {
  return Ec;
}
function tt(t) {
  let e = Ec;
  return (Ec = t), e;
}
function Tp(t, e, r) {
  let n = Ys(t);
  if (n && n.providedIn == "root")
    return n.value === void 0 ? (n.value = n.factory()) : n.value;
  if (r & $.Optional) return null;
  if (e !== void 0) return e;
  Iu(t, "Injector");
}
var vD = {},
  Ri = vD,
  Ic = "__NG_DI_FLAG__",
  Ts = "ngTempTokenPath",
  DD = "ngTokenPath",
  wD = /\n/gm,
  bD = "\u0275",
  Lh = "__source",
  Vr;
function CD() {
  return Vr;
}
function An(t) {
  let e = Vr;
  return (Vr = t), e;
}
function ED(t, e = $.Default) {
  if (Vr === void 0) throw new _(-203, !1);
  return Vr === null
    ? Tp(t, void 0, e)
    : Vr.get(t, e & $.Optional ? null : void 0, e);
}
function b(t, e = $.Default) {
  return (xp() || ED)(qe(t), e);
}
function D(t, e = $.Default) {
  return b(t, Xs(e));
}
function Xs(t) {
  return typeof t > "u" || typeof t == "number"
    ? t
    : 0 | (t.optional && 8) | (t.host && 1) | (t.self && 2) | (t.skipSelf && 4);
}
function _c(t) {
  let e = [];
  for (let r = 0; r < t.length; r++) {
    let n = qe(t[r]);
    if (Array.isArray(n)) {
      if (n.length === 0) throw new _(900, !1);
      let i,
        o = $.Default;
      for (let s = 0; s < n.length; s++) {
        let a = n[s],
          l = ID(a);
        typeof l == "number" ? (l === -1 ? (i = a.token) : (o |= l)) : (i = a);
      }
      e.push(b(i, o));
    } else e.push(b(n));
  }
  return e;
}
function Ap(t, e) {
  return (t[Ic] = e), (t.prototype[Ic] = e), t;
}
function ID(t) {
  return t[Ic];
}
function _D(t, e, r, n) {
  let i = t[Ts];
  throw (
    (e[Lh] && i.unshift(e[Lh]),
    (t.message = SD(
      `
` + t.message,
      i,
      r,
      n
    )),
    (t[DD] = i),
    (t[Ts] = null),
    t)
  );
}
function SD(t, e, r, n = null) {
  t =
    t &&
    t.charAt(0) ===
      `
` &&
    t.charAt(1) == bD
      ? t.slice(2)
      : t;
  let i = Ze(e);
  if (Array.isArray(e)) i = e.map(Ze).join(" -> ");
  else if (typeof e == "object") {
    let o = [];
    for (let s in e)
      if (e.hasOwnProperty(s)) {
        let a = e[s];
        o.push(s + ":" + (typeof a == "string" ? JSON.stringify(a) : Ze(a)));
      }
    i = `{${o.join(", ")}}`;
  }
  return `${r}${n ? "(" + n + ")" : ""}[${i}]: ${t.replace(
    wD,
    `
  `
  )}`;
}
var Js = Ap(Cp("Optional"), 8);
var _u = Ap(Cp("SkipSelf"), 4);
function rr(t, e) {
  let r = t.hasOwnProperty(xs);
  return r ? t[xs] : null;
}
function MD(t, e, r) {
  if (t.length !== e.length) return !1;
  for (let n = 0; n < t.length; n++) {
    let i = t[n],
      o = e[n];
    if ((r && ((i = r(i)), (o = r(o))), o !== i)) return !1;
  }
  return !0;
}
function xD(t) {
  return t.flat(Number.POSITIVE_INFINITY);
}
function Su(t, e) {
  t.forEach((r) => (Array.isArray(r) ? Su(r, e) : e(r)));
}
function Np(t, e, r) {
  e >= t.length ? t.push(r) : t.splice(e, 0, r);
}
function As(t, e) {
  return e >= t.length - 1 ? t.pop() : t.splice(e, 1)[0];
}
function TD(t, e) {
  let r = [];
  for (let n = 0; n < t; n++) r.push(e);
  return r;
}
function AD(t, e, r, n) {
  let i = t.length;
  if (i == e) t.push(r, n);
  else if (i === 1) t.push(n, t[0]), (t[0] = r);
  else {
    for (i--, t.push(t[i - 1], t[i]); i > e; ) {
      let o = i - 2;
      (t[i] = t[o]), i--;
    }
    (t[e] = r), (t[e + 1] = n);
  }
}
function ND(t, e, r) {
  let n = zi(t, e);
  return n >= 0 ? (t[n | 1] = r) : ((n = ~n), AD(t, n, e, r)), n;
}
function lc(t, e) {
  let r = zi(t, e);
  if (r >= 0) return t[r | 1];
}
function zi(t, e) {
  return RD(t, e, 1);
}
function RD(t, e, r) {
  let n = 0,
    i = t.length >> r;
  for (; i !== n; ) {
    let o = n + ((i - n) >> 1),
      s = t[o << r];
    if (e === s) return o << r;
    s > e ? (i = o) : (n = o + 1);
  }
  return ~(i << r);
}
var Br = {},
  mt = [],
  $r = new S(""),
  Rp = new S("", -1),
  Op = new S(""),
  Ns = class {
    get(e, r = Ri) {
      if (r === Ri) {
        let n = new Error(`NullInjectorError: No provider for ${Ze(e)}!`);
        throw ((n.name = "NullInjectorError"), n);
      }
      return r;
    }
  },
  kp = (function (t) {
    return (t[(t.OnPush = 0)] = "OnPush"), (t[(t.Default = 1)] = "Default"), t;
  })(kp || {}),
  Ht = (function (t) {
    return (
      (t[(t.Emulated = 0)] = "Emulated"),
      (t[(t.None = 2)] = "None"),
      (t[(t.ShadowDom = 3)] = "ShadowDom"),
      t
    );
  })(Ht || {}),
  Fe = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.SignalBased = 1)] = "SignalBased"),
      (t[(t.HasDecoratorInputTransform = 2)] = "HasDecoratorInputTransform"),
      t
    );
  })(Fe || {});
function OD(t, e, r) {
  let n = t.length;
  for (;;) {
    let i = t.indexOf(e, r);
    if (i === -1) return i;
    if (i === 0 || t.charCodeAt(i - 1) <= 32) {
      let o = e.length;
      if (i + o === n || t.charCodeAt(i + o) <= 32) return i;
    }
    r = i + 1;
  }
}
function Sc(t, e, r) {
  let n = 0;
  for (; n < r.length; ) {
    let i = r[n];
    if (typeof i == "number") {
      if (i !== 0) break;
      n++;
      let o = r[n++],
        s = r[n++],
        a = r[n++];
      t.setAttribute(e, s, a, o);
    } else {
      let o = i,
        s = r[++n];
      kD(o) ? t.setProperty(e, o, s) : t.setAttribute(e, o, s), n++;
    }
  }
  return n;
}
function Pp(t) {
  return t === 3 || t === 4 || t === 6;
}
function kD(t) {
  return t.charCodeAt(0) === 64;
}
function Oi(t, e) {
  if (!(e === null || e.length === 0))
    if (t === null || t.length === 0) t = e.slice();
    else {
      let r = -1;
      for (let n = 0; n < e.length; n++) {
        let i = e[n];
        typeof i == "number"
          ? (r = i)
          : r === 0 ||
            (r === -1 || r === 2
              ? Vh(t, r, i, null, e[++n])
              : Vh(t, r, i, null, null));
      }
    }
  return t;
}
function Vh(t, e, r, n, i) {
  let o = 0,
    s = t.length;
  if (e === -1) s = -1;
  else
    for (; o < t.length; ) {
      let a = t[o++];
      if (typeof a == "number") {
        if (a === e) {
          s = -1;
          break;
        } else if (a > e) {
          s = o - 1;
          break;
        }
      }
    }
  for (; o < t.length; ) {
    let a = t[o];
    if (typeof a == "number") break;
    if (a === r) {
      if (n === null) {
        i !== null && (t[o + 1] = i);
        return;
      } else if (n === t[o + 1]) {
        t[o + 2] = i;
        return;
      }
    }
    o++, n !== null && o++, i !== null && o++;
  }
  s !== -1 && (t.splice(s, 0, e), (o = s + 1)),
    t.splice(o++, 0, r),
    n !== null && t.splice(o++, 0, n),
    i !== null && t.splice(o++, 0, i);
}
var Fp = "ng-template";
function PD(t, e, r, n) {
  let i = 0;
  if (n) {
    for (; i < e.length && typeof e[i] == "string"; i += 2)
      if (e[i] === "class" && OD(e[i + 1].toLowerCase(), r, 0) !== -1)
        return !0;
  } else if (Mu(t)) return !1;
  if (((i = e.indexOf(1, i)), i > -1)) {
    let o;
    for (; ++i < e.length && typeof (o = e[i]) == "string"; )
      if (o.toLowerCase() === r) return !0;
  }
  return !1;
}
function Mu(t) {
  return t.type === 4 && t.value !== Fp;
}
function FD(t, e, r) {
  let n = t.type === 4 && !r ? Fp : t.value;
  return e === n;
}
function LD(t, e, r) {
  let n = 4,
    i = t.attrs,
    o = i !== null ? BD(i) : 0,
    s = !1;
  for (let a = 0; a < e.length; a++) {
    let l = e[a];
    if (typeof l == "number") {
      if (!s && !Mt(n) && !Mt(l)) return !1;
      if (s && Mt(l)) continue;
      (s = !1), (n = l | (n & 1));
      continue;
    }
    if (!s)
      if (n & 4) {
        if (
          ((n = 2 | (n & 1)),
          (l !== "" && !FD(t, l, r)) || (l === "" && e.length === 1))
        ) {
          if (Mt(n)) return !1;
          s = !0;
        }
      } else if (n & 8) {
        if (i === null || !PD(t, i, l, r)) {
          if (Mt(n)) return !1;
          s = !0;
        }
      } else {
        let c = e[++a],
          u = VD(l, i, Mu(t), r);
        if (u === -1) {
          if (Mt(n)) return !1;
          s = !0;
          continue;
        }
        if (c !== "") {
          let d;
          if (
            (u > o ? (d = "") : (d = i[u + 1].toLowerCase()), n & 2 && c !== d)
          ) {
            if (Mt(n)) return !1;
            s = !0;
          }
        }
      }
  }
  return Mt(n) || s;
}
function Mt(t) {
  return (t & 1) === 0;
}
function VD(t, e, r, n) {
  if (e === null) return -1;
  let i = 0;
  if (n || !r) {
    let o = !1;
    for (; i < e.length; ) {
      let s = e[i];
      if (s === t) return i;
      if (s === 3 || s === 6) o = !0;
      else if (s === 1 || s === 2) {
        let a = e[++i];
        for (; typeof a == "string"; ) a = e[++i];
        continue;
      } else {
        if (s === 4) break;
        if (s === 0) {
          i += 4;
          continue;
        }
      }
      i += o ? 1 : 2;
    }
    return -1;
  } else return $D(e, t);
}
function Lp(t, e, r = !1) {
  for (let n = 0; n < e.length; n++) if (LD(t, e[n], r)) return !0;
  return !1;
}
function jD(t) {
  let e = t.attrs;
  if (e != null) {
    let r = e.indexOf(5);
    if (!(r & 1)) return e[r + 1];
  }
  return null;
}
function BD(t) {
  for (let e = 0; e < t.length; e++) {
    let r = t[e];
    if (Pp(r)) return e;
  }
  return t.length;
}
function $D(t, e) {
  let r = t.indexOf(4);
  if (r > -1)
    for (r++; r < t.length; ) {
      let n = t[r];
      if (typeof n == "number") return -1;
      if (n === e) return r;
      r++;
    }
  return -1;
}
function UD(t, e) {
  e: for (let r = 0; r < e.length; r++) {
    let n = e[r];
    if (t.length === n.length) {
      for (let i = 0; i < t.length; i++) if (t[i] !== n[i]) continue e;
      return !0;
    }
  }
  return !1;
}
function jh(t, e) {
  return t ? ":not(" + e.trim() + ")" : e;
}
function HD(t) {
  let e = t[0],
    r = 1,
    n = 2,
    i = "",
    o = !1;
  for (; r < t.length; ) {
    let s = t[r];
    if (typeof s == "string")
      if (n & 2) {
        let a = t[++r];
        i += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
      } else n & 8 ? (i += "." + s) : n & 4 && (i += " " + s);
    else
      i !== "" && !Mt(s) && ((e += jh(o, i)), (i = "")),
        (n = s),
        (o = o || !Mt(n));
    r++;
  }
  return i !== "" && (e += jh(o, i)), e;
}
function zD(t) {
  return t.map(HD).join(",");
}
function WD(t) {
  let e = [],
    r = [],
    n = 1,
    i = 2;
  for (; n < t.length; ) {
    let o = t[n];
    if (typeof o == "string")
      i === 2 ? o !== "" && e.push(o, t[++n]) : i === 8 && r.push(o);
    else {
      if (!Mt(i)) break;
      i = o;
    }
    n++;
  }
  return { attrs: e, classes: r };
}
function te(t) {
  return Hi(() => {
    let e = Up(t),
      r = Z(v({}, e), {
        decls: t.decls,
        vars: t.vars,
        template: t.template,
        consts: t.consts || null,
        ngContentSelectors: t.ngContentSelectors,
        onPush: t.changeDetection === kp.OnPush,
        directiveDefs: null,
        pipeDefs: null,
        dependencies: (e.standalone && t.dependencies) || null,
        getStandaloneInjector: null,
        signals: t.signals ?? !1,
        data: t.data || {},
        encapsulation: t.encapsulation || Ht.Emulated,
        styles: t.styles || mt,
        _: null,
        schemas: t.schemas || null,
        tView: null,
        id: "",
      });
    Hp(r);
    let n = t.dependencies;
    return (
      (r.directiveDefs = $h(n, !1)), (r.pipeDefs = $h(n, !0)), (r.id = ZD(r)), r
    );
  });
}
function GD(t) {
  return Rn(t) || Vp(t);
}
function qD(t) {
  return t !== null;
}
function Re(t) {
  return Hi(() => ({
    type: t.type,
    bootstrap: t.bootstrap || mt,
    declarations: t.declarations || mt,
    imports: t.imports || mt,
    exports: t.exports || mt,
    transitiveCompileScopes: null,
    schemas: t.schemas || null,
    id: t.id || null,
  }));
}
function Bh(t, e) {
  if (t == null) return Br;
  let r = {};
  for (let n in t)
    if (t.hasOwnProperty(n)) {
      let i = t[n],
        o,
        s,
        a = Fe.None;
      Array.isArray(i)
        ? ((a = i[0]), (o = i[1]), (s = i[2] ?? o))
        : ((o = i), (s = i)),
        e ? ((r[o] = a !== Fe.None ? [n, a] : n), (e[o] = s)) : (r[o] = n);
    }
  return r;
}
function Ce(t) {
  return Hi(() => {
    let e = Up(t);
    return Hp(e), e;
  });
}
function ea(t) {
  return {
    type: t.type,
    name: t.name,
    factory: null,
    pure: t.pure !== !1,
    standalone: t.standalone === !0,
    onDestroy: t.type.prototype.ngOnDestroy || null,
  };
}
function Rn(t) {
  return t[fD] || null;
}
function Vp(t) {
  return t[hD] || null;
}
function jp(t) {
  return t[pD] || null;
}
function Bp(t) {
  let e = Rn(t) || Vp(t) || jp(t);
  return e !== null ? e.standalone : !1;
}
function $p(t, e) {
  let r = t[gD] || null;
  if (!r && e === !0)
    throw new Error(`Type ${Ze(t)} does not have '\u0275mod' property.`);
  return r;
}
function Up(t) {
  let e = {};
  return {
    type: t.type,
    providersResolver: null,
    factory: null,
    hostBindings: t.hostBindings || null,
    hostVars: t.hostVars || 0,
    hostAttrs: t.hostAttrs || null,
    contentQueries: t.contentQueries || null,
    declaredInputs: e,
    inputTransforms: null,
    inputConfig: t.inputs || Br,
    exportAs: t.exportAs || null,
    standalone: t.standalone === !0,
    signals: t.signals === !0,
    selectors: t.selectors || mt,
    viewQuery: t.viewQuery || null,
    features: t.features || null,
    setInput: null,
    findHostDirectiveDefs: null,
    hostDirectives: null,
    inputs: Bh(t.inputs, e),
    outputs: Bh(t.outputs),
    debugInfo: null,
  };
}
function Hp(t) {
  t.features?.forEach((e) => e(t));
}
function $h(t, e) {
  if (!t) return null;
  let r = e ? jp : GD;
  return () => (typeof t == "function" ? t() : t).map((n) => r(n)).filter(qD);
}
function ZD(t) {
  let e = 0,
    r = [
      t.selectors,
      t.ngContentSelectors,
      t.hostVars,
      t.hostAttrs,
      t.consts,
      t.vars,
      t.decls,
      t.encapsulation,
      t.standalone,
      t.signals,
      t.exportAs,
      JSON.stringify(t.inputs),
      JSON.stringify(t.outputs),
      Object.getOwnPropertyNames(t.type.prototype),
      !!t.contentQueries,
      !!t.viewQuery,
    ].join("|");
  for (let i of r) e = (Math.imul(31, e) + i.charCodeAt(0)) << 0;
  return (e += 2147483648), "c" + e;
}
function ta(t) {
  return { ɵproviders: t };
}
function QD(...t) {
  return { ɵproviders: zp(!0, t), ɵfromNgModule: !0 };
}
function zp(t, ...e) {
  let r = [],
    n = new Set(),
    i,
    o = (s) => {
      r.push(s);
    };
  return (
    Su(e, (s) => {
      let a = s;
      Mc(a, o, [], n) && ((i ||= []), i.push(a));
    }),
    i !== void 0 && Wp(i, o),
    r
  );
}
function Wp(t, e) {
  for (let r = 0; r < t.length; r++) {
    let { ngModule: n, providers: i } = t[r];
    xu(i, (o) => {
      e(o, n);
    });
  }
}
function Mc(t, e, r, n) {
  if (((t = qe(t)), !t)) return !1;
  let i = null,
    o = kh(t),
    s = !o && Rn(t);
  if (!o && !s) {
    let l = t.ngModule;
    if (((o = kh(l)), o)) i = l;
    else return !1;
  } else {
    if (s && !s.standalone) return !1;
    i = t;
  }
  let a = n.has(i);
  if (s) {
    if (a) return !1;
    if ((n.add(i), s.dependencies)) {
      let l =
        typeof s.dependencies == "function" ? s.dependencies() : s.dependencies;
      for (let c of l) Mc(c, e, r, n);
    }
  } else if (o) {
    if (o.imports != null && !a) {
      n.add(i);
      let c;
      try {
        Su(o.imports, (u) => {
          Mc(u, e, r, n) && ((c ||= []), c.push(u));
        });
      } finally {
      }
      c !== void 0 && Wp(c, e);
    }
    if (!a) {
      let c = rr(i) || (() => new i());
      e({ provide: i, useFactory: c, deps: mt }, i),
        e({ provide: Op, useValue: i, multi: !0 }, i),
        e({ provide: $r, useValue: () => b(i), multi: !0 }, i);
    }
    let l = o.providers;
    if (l != null && !a) {
      let c = t;
      xu(l, (u) => {
        e(u, c);
      });
    }
  } else return !1;
  return i !== t && t.providers !== void 0;
}
function xu(t, e) {
  for (let r of t)
    Mp(r) && (r = r.ɵproviders), Array.isArray(r) ? xu(r, e) : e(r);
}
var YD = le({ provide: String, useValue: le });
function Gp(t) {
  return t !== null && typeof t == "object" && YD in t;
}
function KD(t) {
  return !!(t && t.useExisting);
}
function XD(t) {
  return !!(t && t.useFactory);
}
function Ur(t) {
  return typeof t == "function";
}
function JD(t) {
  return !!t.useClass;
}
var na = new S(""),
  Cs = {},
  ew = {},
  cc;
function Tu() {
  return cc === void 0 && (cc = new Ns()), cc;
}
var Qe = class {},
  ki = class extends Qe {
    get destroyed() {
      return this._destroyed;
    }
    constructor(e, r, n, i) {
      super(),
        (this.parent = r),
        (this.source = n),
        (this.scopes = i),
        (this.records = new Map()),
        (this._ngOnDestroyHooks = new Set()),
        (this._onDestroyHooks = []),
        (this._destroyed = !1),
        Tc(e, (s) => this.processProvider(s)),
        this.records.set(Rp, kr(void 0, this)),
        i.has("environment") && this.records.set(Qe, kr(void 0, this));
      let o = this.records.get(na);
      o != null && typeof o.value == "string" && this.scopes.add(o.value),
        (this.injectorDefTypes = new Set(this.get(Op, mt, $.Self)));
    }
    destroy() {
      this.assertNotDestroyed(), (this._destroyed = !0);
      let e = W(null);
      try {
        for (let n of this._ngOnDestroyHooks) n.ngOnDestroy();
        let r = this._onDestroyHooks;
        this._onDestroyHooks = [];
        for (let n of r) n();
      } finally {
        this.records.clear(),
          this._ngOnDestroyHooks.clear(),
          this.injectorDefTypes.clear(),
          W(e);
      }
    }
    onDestroy(e) {
      return (
        this.assertNotDestroyed(),
        this._onDestroyHooks.push(e),
        () => this.removeOnDestroy(e)
      );
    }
    runInContext(e) {
      this.assertNotDestroyed();
      let r = An(this),
        n = tt(void 0),
        i;
      try {
        return e();
      } finally {
        An(r), tt(n);
      }
    }
    get(e, r = Ri, n = $.Default) {
      if ((this.assertNotDestroyed(), e.hasOwnProperty(Fh))) return e[Fh](this);
      n = Xs(n);
      let i,
        o = An(this),
        s = tt(void 0);
      try {
        if (!(n & $.SkipSelf)) {
          let l = this.records.get(e);
          if (l === void 0) {
            let c = ow(e) && Ys(e);
            c && this.injectableDefInScope(c)
              ? (l = kr(xc(e), Cs))
              : (l = null),
              this.records.set(e, l);
          }
          if (l != null) return this.hydrate(e, l);
        }
        let a = n & $.Self ? Tu() : this.parent;
        return (r = n & $.Optional && r === Ri ? null : r), a.get(e, r);
      } catch (a) {
        if (a.name === "NullInjectorError") {
          if (((a[Ts] = a[Ts] || []).unshift(Ze(e)), o)) throw a;
          return _D(a, e, "R3InjectorError", this.source);
        } else throw a;
      } finally {
        tt(s), An(o);
      }
    }
    resolveInjectorInitializers() {
      let e = W(null),
        r = An(this),
        n = tt(void 0),
        i;
      try {
        let o = this.get($r, mt, $.Self);
        for (let s of o) s();
      } finally {
        An(r), tt(n), W(e);
      }
    }
    toString() {
      let e = [],
        r = this.records;
      for (let n of r.keys()) e.push(Ze(n));
      return `R3Injector[${e.join(", ")}]`;
    }
    assertNotDestroyed() {
      if (this._destroyed) throw new _(205, !1);
    }
    processProvider(e) {
      e = qe(e);
      let r = Ur(e) ? e : qe(e && e.provide),
        n = nw(e);
      if (!Ur(e) && e.multi === !0) {
        let i = this.records.get(r);
        i ||
          ((i = kr(void 0, Cs, !0)),
          (i.factory = () => _c(i.multi)),
          this.records.set(r, i)),
          (r = e),
          i.multi.push(e);
      }
      this.records.set(r, n);
    }
    hydrate(e, r) {
      let n = W(null);
      try {
        return (
          r.value === Cs && ((r.value = ew), (r.value = r.factory())),
          typeof r.value == "object" &&
            r.value &&
            iw(r.value) &&
            this._ngOnDestroyHooks.add(r.value),
          r.value
        );
      } finally {
        W(n);
      }
    }
    injectableDefInScope(e) {
      if (!e.providedIn) return !1;
      let r = qe(e.providedIn);
      return typeof r == "string"
        ? r === "any" || this.scopes.has(r)
        : this.injectorDefTypes.has(r);
    }
    removeOnDestroy(e) {
      let r = this._onDestroyHooks.indexOf(e);
      r !== -1 && this._onDestroyHooks.splice(r, 1);
    }
  };
function xc(t) {
  let e = Ys(t),
    r = e !== null ? e.factory : rr(t);
  if (r !== null) return r;
  if (t instanceof S) throw new _(204, !1);
  if (t instanceof Function) return tw(t);
  throw new _(204, !1);
}
function tw(t) {
  if (t.length > 0) throw new _(204, !1);
  let r = uD(t);
  return r !== null ? () => r.factory(t) : () => new t();
}
function nw(t) {
  if (Gp(t)) return kr(void 0, t.useValue);
  {
    let e = qp(t);
    return kr(e, Cs);
  }
}
function qp(t, e, r) {
  let n;
  if (Ur(t)) {
    let i = qe(t);
    return rr(i) || xc(i);
  } else if (Gp(t)) n = () => qe(t.useValue);
  else if (XD(t)) n = () => t.useFactory(..._c(t.deps || []));
  else if (KD(t)) n = () => b(qe(t.useExisting));
  else {
    let i = qe(t && (t.useClass || t.provide));
    if (rw(t)) n = () => new i(..._c(t.deps));
    else return rr(i) || xc(i);
  }
  return n;
}
function kr(t, e, r = !1) {
  return { factory: t, value: e, multi: r ? [] : void 0 };
}
function rw(t) {
  return !!t.deps;
}
function iw(t) {
  return (
    t !== null && typeof t == "object" && typeof t.ngOnDestroy == "function"
  );
}
function ow(t) {
  return typeof t == "function" || (typeof t == "object" && t instanceof S);
}
function Tc(t, e) {
  for (let r of t)
    Array.isArray(r) ? Tc(r, e) : r && Mp(r) ? Tc(r.ɵproviders, e) : e(r);
}
function Rt(t, e) {
  t instanceof ki && t.assertNotDestroyed();
  let r,
    n = An(t),
    i = tt(void 0);
  try {
    return e();
  } finally {
    An(n), tt(i);
  }
}
function Zp() {
  return xp() !== void 0 || CD() != null;
}
function sw(t) {
  if (!Zp()) throw new _(-203, !1);
}
function aw(t) {
  let e = be.ng;
  if (e && e.ɵcompilerFacade) return e.ɵcompilerFacade;
  throw new Error("JIT compiler unavailable");
}
function lw(t) {
  return typeof t == "function";
}
var pn = 0,
  L = 1,
  N = 2,
  Le = 3,
  xt = 4,
  lt = 5,
  Pi = 6,
  Fi = 7,
  Tt = 8,
  Hr = 9,
  At = 10,
  ye = 11,
  Li = 12,
  Uh = 13,
  Zr = 14,
  Nt = 15,
  Wi = 16,
  Pr = 17,
  un = 18,
  ra = 19,
  Qp = 20,
  Nn = 21,
  uc = 22,
  ir = 23,
  nt = 25,
  Yp = 1;
var or = 7,
  Rs = 8,
  zr = 9,
  at = 10,
  Au = (function (t) {
    return (
      (t[(t.None = 0)] = "None"),
      (t[(t.HasTransplantedViews = 2)] = "HasTransplantedViews"),
      t
    );
  })(Au || {});
function tr(t) {
  return Array.isArray(t) && typeof t[Yp] == "object";
}
function gn(t) {
  return Array.isArray(t) && t[Yp] === !0;
}
function Nu(t) {
  return (t.flags & 4) !== 0;
}
function ia(t) {
  return t.componentOffset > -1;
}
function oa(t) {
  return (t.flags & 1) === 1;
}
function On(t) {
  return !!t.template;
}
function cw(t) {
  return (t[N] & 512) !== 0;
}
var Ac = class {
  constructor(e, r, n) {
    (this.previousValue = e), (this.currentValue = r), (this.firstChange = n);
  }
  isFirstChange() {
    return this.firstChange;
  }
};
function Kp(t, e, r, n) {
  e !== null ? e.applyValueToInputSignal(e, n) : (t[r] = n);
}
function mn() {
  return Xp;
}
function Xp(t) {
  return t.type.prototype.ngOnChanges && (t.setInput = dw), uw;
}
mn.ngInherit = !0;
function uw() {
  let t = eg(this),
    e = t?.current;
  if (e) {
    let r = t.previous;
    if (r === Br) t.previous = e;
    else for (let n in e) r[n] = e[n];
    (t.current = null), this.ngOnChanges(e);
  }
}
function dw(t, e, r, n, i) {
  let o = this.declaredInputs[n],
    s = eg(t) || fw(t, { previous: Br, current: null }),
    a = s.current || (s.current = {}),
    l = s.previous,
    c = l[o];
  (a[o] = new Ac(c && c.currentValue, r, l === Br)), Kp(t, e, i, r);
}
var Jp = "__ngSimpleChanges__";
function eg(t) {
  return t[Jp] || null;
}
function fw(t, e) {
  return (t[Jp] = e);
}
var Hh = null;
var $t = function (t, e, r) {
    Hh?.(t, e, r);
  },
  hw = "svg",
  pw = "math",
  gw = !1;
function mw() {
  return gw;
}
function zt(t) {
  for (; Array.isArray(t); ) t = t[pn];
  return t;
}
function tg(t, e) {
  return zt(e[t]);
}
function yt(t, e) {
  return zt(e[t.index]);
}
function ng(t, e) {
  return t.data[e];
}
function Ru(t, e) {
  return t[e];
}
function Ln(t, e) {
  let r = e[t];
  return tr(r) ? r : r[pn];
}
function yw(t) {
  return (t[N] & 4) === 4;
}
function Ou(t) {
  return (t[N] & 128) === 128;
}
function vw(t) {
  return gn(t[Le]);
}
function Wr(t, e) {
  return e == null ? null : t[e];
}
function rg(t) {
  t[Pr] = 0;
}
function Dw(t) {
  t[N] & 1024 || ((t[N] |= 1024), Ou(t) && Vi(t));
}
function ww(t, e) {
  for (; t > 0; ) (e = e[Zr]), t--;
  return e;
}
function ku(t) {
  return !!(t[N] & 9216 || t[ir]?.dirty);
}
function Nc(t) {
  t[At].changeDetectionScheduler?.notify(1),
    ku(t)
      ? Vi(t)
      : t[N] & 64 &&
        (mw()
          ? ((t[N] |= 1024), Vi(t))
          : t[At].changeDetectionScheduler?.notify());
}
function Vi(t) {
  t[At].changeDetectionScheduler?.notify();
  let e = ji(t);
  for (; e !== null && !(e[N] & 8192 || ((e[N] |= 8192), !Ou(e))); ) e = ji(e);
}
function ig(t, e) {
  if ((t[N] & 256) === 256) throw new _(911, !1);
  t[Nn] === null && (t[Nn] = []), t[Nn].push(e);
}
function bw(t, e) {
  if (t[Nn] === null) return;
  let r = t[Nn].indexOf(e);
  r !== -1 && t[Nn].splice(r, 1);
}
function ji(t) {
  let e = t[Le];
  return gn(e) ? e[Le] : e;
}
var V = { lFrame: dg(null), bindingsEnabled: !0, skipHydrationRootTNode: null };
function Cw() {
  return V.lFrame.elementDepthCount;
}
function Ew() {
  V.lFrame.elementDepthCount++;
}
function Iw() {
  V.lFrame.elementDepthCount--;
}
function og() {
  return V.bindingsEnabled;
}
function sg() {
  return V.skipHydrationRootTNode !== null;
}
function _w(t) {
  return V.skipHydrationRootTNode === t;
}
function Sw() {
  V.skipHydrationRootTNode = null;
}
function U() {
  return V.lFrame.lView;
}
function Se() {
  return V.lFrame.tView;
}
function R(t) {
  return (V.lFrame.contextLView = t), t[Tt];
}
function O(t) {
  return (V.lFrame.contextLView = null), t;
}
function Ye() {
  let t = ag();
  for (; t !== null && t.type === 64; ) t = t.parent;
  return t;
}
function ag() {
  return V.lFrame.currentTNode;
}
function Mw() {
  let t = V.lFrame,
    e = t.currentTNode;
  return t.isParent ? e : e.parent;
}
function fr(t, e) {
  let r = V.lFrame;
  (r.currentTNode = t), (r.isParent = e);
}
function Pu() {
  return V.lFrame.isParent;
}
function Fu() {
  V.lFrame.isParent = !1;
}
function xw() {
  return V.lFrame.contextLView;
}
function Gi() {
  let t = V.lFrame,
    e = t.bindingRootIndex;
  return e === -1 && (e = t.bindingRootIndex = t.tView.bindingStartIndex), e;
}
function Tw(t) {
  return (V.lFrame.bindingIndex = t);
}
function sa() {
  return V.lFrame.bindingIndex++;
}
function Aw(t) {
  let e = V.lFrame,
    r = e.bindingIndex;
  return (e.bindingIndex = e.bindingIndex + t), r;
}
function Nw() {
  return V.lFrame.inI18n;
}
function Rw(t, e) {
  let r = V.lFrame;
  (r.bindingIndex = r.bindingRootIndex = t), Rc(e);
}
function Ow() {
  return V.lFrame.currentDirectiveIndex;
}
function Rc(t) {
  V.lFrame.currentDirectiveIndex = t;
}
function kw(t) {
  let e = V.lFrame.currentDirectiveIndex;
  return e === -1 ? null : t[e];
}
function lg() {
  return V.lFrame.currentQueryIndex;
}
function Lu(t) {
  V.lFrame.currentQueryIndex = t;
}
function Pw(t) {
  let e = t[L];
  return e.type === 2 ? e.declTNode : e.type === 1 ? t[lt] : null;
}
function cg(t, e, r) {
  if (r & $.SkipSelf) {
    let i = e,
      o = t;
    for (; (i = i.parent), i === null && !(r & $.Host); )
      if (((i = Pw(o)), i === null || ((o = o[Zr]), i.type & 10))) break;
    if (i === null) return !1;
    (e = i), (t = o);
  }
  let n = (V.lFrame = ug());
  return (n.currentTNode = e), (n.lView = t), !0;
}
function Vu(t) {
  let e = ug(),
    r = t[L];
  (V.lFrame = e),
    (e.currentTNode = r.firstChild),
    (e.lView = t),
    (e.tView = r),
    (e.contextLView = t),
    (e.bindingIndex = r.bindingStartIndex),
    (e.inI18n = !1);
}
function ug() {
  let t = V.lFrame,
    e = t === null ? null : t.child;
  return e === null ? dg(t) : e;
}
function dg(t) {
  let e = {
    currentTNode: null,
    isParent: !0,
    lView: null,
    tView: null,
    selectedIndex: -1,
    contextLView: null,
    elementDepthCount: 0,
    currentNamespace: null,
    currentDirectiveIndex: -1,
    bindingRootIndex: -1,
    bindingIndex: -1,
    currentQueryIndex: 0,
    parent: t,
    child: null,
    inI18n: !1,
  };
  return t !== null && (t.child = e), e;
}
function fg() {
  let t = V.lFrame;
  return (V.lFrame = t.parent), (t.currentTNode = null), (t.lView = null), t;
}
var hg = fg;
function ju() {
  let t = fg();
  (t.isParent = !0),
    (t.tView = null),
    (t.selectedIndex = -1),
    (t.contextLView = null),
    (t.elementDepthCount = 0),
    (t.currentDirectiveIndex = -1),
    (t.currentNamespace = null),
    (t.bindingRootIndex = -1),
    (t.bindingIndex = -1),
    (t.currentQueryIndex = 0);
}
function Fw(t) {
  return (V.lFrame.contextLView = ww(t, V.lFrame.contextLView))[Tt];
}
function Qr() {
  return V.lFrame.selectedIndex;
}
function sr(t) {
  V.lFrame.selectedIndex = t;
}
function aa() {
  let t = V.lFrame;
  return ng(t.tView, t.selectedIndex);
}
function Lw() {
  return V.lFrame.currentNamespace;
}
var pg = !0;
function la() {
  return pg;
}
function ca(t) {
  pg = t;
}
function Vw(t, e, r) {
  let { ngOnChanges: n, ngOnInit: i, ngDoCheck: o } = e.type.prototype;
  if (n) {
    let s = Xp(e);
    (r.preOrderHooks ??= []).push(t, s),
      (r.preOrderCheckHooks ??= []).push(t, s);
  }
  i && (r.preOrderHooks ??= []).push(0 - t, i),
    o &&
      ((r.preOrderHooks ??= []).push(t, o),
      (r.preOrderCheckHooks ??= []).push(t, o));
}
function ua(t, e) {
  for (let r = e.directiveStart, n = e.directiveEnd; r < n; r++) {
    let o = t.data[r].type.prototype,
      {
        ngAfterContentInit: s,
        ngAfterContentChecked: a,
        ngAfterViewInit: l,
        ngAfterViewChecked: c,
        ngOnDestroy: u,
      } = o;
    s && (t.contentHooks ??= []).push(-r, s),
      a &&
        ((t.contentHooks ??= []).push(r, a),
        (t.contentCheckHooks ??= []).push(r, a)),
      l && (t.viewHooks ??= []).push(-r, l),
      c &&
        ((t.viewHooks ??= []).push(r, c), (t.viewCheckHooks ??= []).push(r, c)),
      u != null && (t.destroyHooks ??= []).push(r, u);
  }
}
function Es(t, e, r) {
  gg(t, e, 3, r);
}
function Is(t, e, r, n) {
  (t[N] & 3) === r && gg(t, e, r, n);
}
function dc(t, e) {
  let r = t[N];
  (r & 3) === e && ((r &= 16383), (r += 1), (t[N] = r));
}
function gg(t, e, r, n) {
  let i = n !== void 0 ? t[Pr] & 65535 : 0,
    o = n ?? -1,
    s = e.length - 1,
    a = 0;
  for (let l = i; l < s; l++)
    if (typeof e[l + 1] == "number") {
      if (((a = e[l]), n != null && a >= n)) break;
    } else
      e[l] < 0 && (t[Pr] += 65536),
        (a < o || o == -1) &&
          (jw(t, r, e, l), (t[Pr] = (t[Pr] & 4294901760) + l + 2)),
        l++;
}
function zh(t, e) {
  $t(4, t, e);
  let r = W(null);
  try {
    e.call(t);
  } finally {
    W(r), $t(5, t, e);
  }
}
function jw(t, e, r, n) {
  let i = r[n] < 0,
    o = r[n + 1],
    s = i ? -r[n] : r[n],
    a = t[s];
  i
    ? t[N] >> 14 < t[Pr] >> 16 &&
      (t[N] & 3) === e &&
      ((t[N] += 16384), zh(a, o))
    : zh(a, o);
}
var jr = -1,
  ar = class {
    constructor(e, r, n) {
      (this.factory = e),
        (this.resolving = !1),
        (this.canSeeViewProviders = r),
        (this.injectImpl = n);
    }
  };
function Bw(t) {
  return t instanceof ar;
}
function $w(t) {
  return (t.flags & 8) !== 0;
}
function Uw(t) {
  return (t.flags & 16) !== 0;
}
function mg(t) {
  return t !== jr;
}
function Os(t) {
  return t & 32767;
}
function Hw(t) {
  return t >> 16;
}
function ks(t, e) {
  let r = Hw(t),
    n = e;
  for (; r > 0; ) (n = n[Zr]), r--;
  return n;
}
var Oc = !0;
function Ps(t) {
  let e = Oc;
  return (Oc = t), e;
}
var zw = 256,
  yg = zw - 1,
  vg = 5,
  Ww = 0,
  Ut = {};
function Gw(t, e, r) {
  let n;
  typeof r == "string"
    ? (n = r.charCodeAt(0) || 0)
    : r.hasOwnProperty(Ai) && (n = r[Ai]),
    n == null && (n = r[Ai] = Ww++);
  let i = n & yg,
    o = 1 << i;
  e.data[t + (i >> vg)] |= o;
}
function Fs(t, e) {
  let r = Dg(t, e);
  if (r !== -1) return r;
  let n = e[L];
  n.firstCreatePass &&
    ((t.injectorIndex = e.length),
    fc(n.data, t),
    fc(e, null),
    fc(n.blueprint, null));
  let i = Bu(t, e),
    o = t.injectorIndex;
  if (mg(i)) {
    let s = Os(i),
      a = ks(i, e),
      l = a[L].data;
    for (let c = 0; c < 8; c++) e[o + c] = a[s + c] | l[s + c];
  }
  return (e[o + 8] = i), o;
}
function fc(t, e) {
  t.push(0, 0, 0, 0, 0, 0, 0, 0, e);
}
function Dg(t, e) {
  return t.injectorIndex === -1 ||
    (t.parent && t.parent.injectorIndex === t.injectorIndex) ||
    e[t.injectorIndex + 8] === null
    ? -1
    : t.injectorIndex;
}
function Bu(t, e) {
  if (t.parent && t.parent.injectorIndex !== -1) return t.parent.injectorIndex;
  let r = 0,
    n = null,
    i = e;
  for (; i !== null; ) {
    if (((n = Ig(i)), n === null)) return jr;
    if ((r++, (i = i[Zr]), n.injectorIndex !== -1))
      return n.injectorIndex | (r << 16);
  }
  return jr;
}
function kc(t, e, r) {
  Gw(t, e, r);
}
function qw(t, e) {
  if (e === "class") return t.classes;
  if (e === "style") return t.styles;
  let r = t.attrs;
  if (r) {
    let n = r.length,
      i = 0;
    for (; i < n; ) {
      let o = r[i];
      if (Pp(o)) break;
      if (o === 0) i = i + 2;
      else if (typeof o == "number")
        for (i++; i < n && typeof r[i] == "string"; ) i++;
      else {
        if (o === e) return r[i + 1];
        i = i + 2;
      }
    }
  }
  return null;
}
function wg(t, e, r) {
  if (r & $.Optional || t !== void 0) return t;
  Iu(e, "NodeInjector");
}
function bg(t, e, r, n) {
  if (
    (r & $.Optional && n === void 0 && (n = null), !(r & ($.Self | $.Host)))
  ) {
    let i = t[Hr],
      o = tt(void 0);
    try {
      return i ? i.get(e, n, r & $.Optional) : Tp(e, n, r & $.Optional);
    } finally {
      tt(o);
    }
  }
  return wg(n, e, r);
}
function Cg(t, e, r, n = $.Default, i) {
  if (t !== null) {
    if (e[N] & 2048 && !(n & $.Self)) {
      let s = Kw(t, e, r, n, Ut);
      if (s !== Ut) return s;
    }
    let o = Eg(t, e, r, n, Ut);
    if (o !== Ut) return o;
  }
  return bg(e, r, n, i);
}
function Eg(t, e, r, n, i) {
  let o = Qw(r);
  if (typeof o == "function") {
    if (!cg(e, t, n)) return n & $.Host ? wg(i, r, n) : bg(e, r, n, i);
    try {
      let s;
      if (((s = o(n)), s == null && !(n & $.Optional))) Iu(r);
      else return s;
    } finally {
      hg();
    }
  } else if (typeof o == "number") {
    let s = null,
      a = Dg(t, e),
      l = jr,
      c = n & $.Host ? e[Nt][lt] : null;
    for (
      (a === -1 || n & $.SkipSelf) &&
      ((l = a === -1 ? Bu(t, e) : e[a + 8]),
      l === jr || !Gh(n, !1)
        ? (a = -1)
        : ((s = e[L]), (a = Os(l)), (e = ks(l, e))));
      a !== -1;

    ) {
      let u = e[L];
      if (Wh(o, a, u.data)) {
        let d = Zw(a, e, r, s, n, c);
        if (d !== Ut) return d;
      }
      (l = e[a + 8]),
        l !== jr && Gh(n, e[L].data[a + 8] === c) && Wh(o, a, e)
          ? ((s = u), (a = Os(l)), (e = ks(l, e)))
          : (a = -1);
    }
  }
  return i;
}
function Zw(t, e, r, n, i, o) {
  let s = e[L],
    a = s.data[t + 8],
    l = n == null ? ia(a) && Oc : n != s && (a.type & 3) !== 0,
    c = i & $.Host && o === a,
    u = _s(a, s, r, l, c);
  return u !== null ? lr(e, s, u, a) : Ut;
}
function _s(t, e, r, n, i) {
  let o = t.providerIndexes,
    s = e.data,
    a = o & 1048575,
    l = t.directiveStart,
    c = t.directiveEnd,
    u = o >> 20,
    d = n ? a : a + u,
    f = i ? a + u : c;
  for (let g = d; g < f; g++) {
    let C = s[g];
    if ((g < l && r === C) || (g >= l && C.type === r)) return g;
  }
  if (i) {
    let g = s[l];
    if (g && On(g) && g.type === r) return l;
  }
  return null;
}
function lr(t, e, r, n) {
  let i = t[r],
    o = e.data;
  if (Bw(i)) {
    let s = i;
    s.resolving && yD(mD(o[r]));
    let a = Ps(s.canSeeViewProviders);
    s.resolving = !0;
    let l,
      c = s.injectImpl ? tt(s.injectImpl) : null,
      u = cg(t, n, $.Default);
    try {
      (i = t[r] = s.factory(void 0, o, t, n)),
        e.firstCreatePass && r >= n.directiveStart && Vw(r, o[r], e);
    } finally {
      c !== null && tt(c), Ps(a), (s.resolving = !1), hg();
    }
  }
  return i;
}
function Qw(t) {
  if (typeof t == "string") return t.charCodeAt(0) || 0;
  let e = t.hasOwnProperty(Ai) ? t[Ai] : void 0;
  return typeof e == "number" ? (e >= 0 ? e & yg : Yw) : e;
}
function Wh(t, e, r) {
  let n = 1 << t;
  return !!(r[e + (t >> vg)] & n);
}
function Gh(t, e) {
  return !(t & $.Self) && !(t & $.Host && e);
}
var nr = class {
  constructor(e, r) {
    (this._tNode = e), (this._lView = r);
  }
  get(e, r, n) {
    return Cg(this._tNode, this._lView, e, Xs(n), r);
  }
};
function Yw() {
  return new nr(Ye(), U());
}
function Vn(t) {
  return Hi(() => {
    let e = t.prototype.constructor,
      r = e[xs] || Pc(e),
      n = Object.prototype,
      i = Object.getPrototypeOf(t.prototype).constructor;
    for (; i && i !== n; ) {
      let o = i[xs] || Pc(i);
      if (o && o !== r) return o;
      i = Object.getPrototypeOf(i);
    }
    return (o) => new o();
  });
}
function Pc(t) {
  return Ep(t)
    ? () => {
        let e = Pc(qe(t));
        return e && e();
      }
    : rr(t);
}
function Kw(t, e, r, n, i) {
  let o = t,
    s = e;
  for (; o !== null && s !== null && s[N] & 2048 && !(s[N] & 512); ) {
    let a = Eg(o, s, r, n | $.Self, Ut);
    if (a !== Ut) return a;
    let l = o.parent;
    if (!l) {
      let c = s[Qp];
      if (c) {
        let u = c.get(r, Ut, n);
        if (u !== Ut) return u;
      }
      (l = Ig(s)), (s = s[Zr]);
    }
    o = l;
  }
  return i;
}
function Ig(t) {
  let e = t[L],
    r = e.type;
  return r === 2 ? e.declTNode : r === 1 ? t[lt] : null;
}
function $u(t) {
  return qw(Ye(), t);
}
function qh(t, e = null, r = null, n) {
  let i = _g(t, e, r, n);
  return i.resolveInjectorInitializers(), i;
}
function _g(t, e = null, r = null, n, i = new Set()) {
  let o = [r || mt, QD(t)];
  return (
    (n = n || (typeof t == "object" ? void 0 : Ze(t))),
    new ki(o, e || Tu(), n || null, i)
  );
}
var Ot = (() => {
  let e = class e {
    static create(n, i) {
      if (Array.isArray(n)) return qh({ name: "" }, i, n, "");
      {
        let o = n.name ?? "";
        return qh({ name: o }, n.parent, n.providers, o);
      }
    }
  };
  (e.THROW_IF_NOT_FOUND = Ri),
    (e.NULL = new Ns()),
    (e.ɵprov = E({ token: e, providedIn: "any", factory: () => b(Rp) })),
    (e.__NG_ELEMENT_ID__ = -1);
  let t = e;
  return t;
})();
var Xw = "ngOriginalError";
function hc(t) {
  return t[Xw];
}
var Wt = class {
    constructor() {
      this._console = console;
    }
    handleError(e) {
      let r = this._findOriginalError(e);
      this._console.error("ERROR", e),
        r && this._console.error("ORIGINAL ERROR", r);
    }
    _findOriginalError(e) {
      let r = e && hc(e);
      for (; r && hc(r); ) r = hc(r);
      return r || null;
    }
  },
  Sg = new S("", {
    providedIn: "root",
    factory: () => D(Wt).handleError.bind(void 0),
  }),
  Uu = (() => {
    let e = class e {};
    (e.__NG_ELEMENT_ID__ = Jw), (e.__NG_ENV_ID__ = (n) => n);
    let t = e;
    return t;
  })(),
  Fc = class extends Uu {
    constructor(e) {
      super(), (this._lView = e);
    }
    onDestroy(e) {
      return ig(this._lView, e), () => bw(this._lView, e);
    }
  };
function Jw() {
  return new Fc(U());
}
function eb() {
  return Yr(Ye(), U());
}
function Yr(t, e) {
  return new $e(yt(t, e));
}
var $e = (() => {
  let e = class e {
    constructor(n) {
      this.nativeElement = n;
    }
  };
  e.__NG_ELEMENT_ID__ = eb;
  let t = e;
  return t;
})();
function tb(t) {
  return t instanceof $e ? t.nativeElement : t;
}
var Lc = class extends me {
  constructor(e = !1) {
    super(),
      (this.destroyRef = void 0),
      (this.__isAsync = e),
      Zp() && (this.destroyRef = D(Uu, { optional: !0 }) ?? void 0);
  }
  emit(e) {
    let r = W(null);
    try {
      super.next(e);
    } finally {
      W(r);
    }
  }
  subscribe(e, r, n) {
    let i = e,
      o = r || (() => null),
      s = n;
    if (e && typeof e == "object") {
      let l = e;
      (i = l.next?.bind(l)), (o = l.error?.bind(l)), (s = l.complete?.bind(l));
    }
    this.__isAsync && ((o = pc(o)), i && (i = pc(i)), s && (s = pc(s)));
    let a = super.subscribe({ next: i, error: o, complete: s });
    return e instanceof De && e.add(a), a;
  }
};
function pc(t) {
  return (e) => {
    setTimeout(t, void 0, e);
  };
}
var pe = Lc;
function nb() {
  return this._results[Symbol.iterator]();
}
var Vc = class t {
  get changes() {
    return (this._changes ??= new pe());
  }
  constructor(e = !1) {
    (this._emitDistinctChangesOnly = e),
      (this.dirty = !0),
      (this._onDirty = void 0),
      (this._results = []),
      (this._changesDetected = !1),
      (this._changes = void 0),
      (this.length = 0),
      (this.first = void 0),
      (this.last = void 0);
    let r = t.prototype;
    r[Symbol.iterator] || (r[Symbol.iterator] = nb);
  }
  get(e) {
    return this._results[e];
  }
  map(e) {
    return this._results.map(e);
  }
  filter(e) {
    return this._results.filter(e);
  }
  find(e) {
    return this._results.find(e);
  }
  reduce(e, r) {
    return this._results.reduce(e, r);
  }
  forEach(e) {
    this._results.forEach(e);
  }
  some(e) {
    return this._results.some(e);
  }
  toArray() {
    return this._results.slice();
  }
  toString() {
    return this._results.toString();
  }
  reset(e, r) {
    this.dirty = !1;
    let n = xD(e);
    (this._changesDetected = !MD(this._results, n, r)) &&
      ((this._results = n),
      (this.length = n.length),
      (this.last = n[this.length - 1]),
      (this.first = n[0]));
  }
  notifyOnChanges() {
    this._changes !== void 0 &&
      (this._changesDetected || !this._emitDistinctChangesOnly) &&
      this._changes.emit(this);
  }
  onDirty(e) {
    this._onDirty = e;
  }
  setDirty() {
    (this.dirty = !0), this._onDirty?.();
  }
  destroy() {
    this._changes !== void 0 &&
      (this._changes.complete(), this._changes.unsubscribe());
  }
};
function Mg(t) {
  return (t.flags & 128) === 128;
}
var xg = new Map(),
  rb = 0;
function ib() {
  return rb++;
}
function ob(t) {
  xg.set(t[ra], t);
}
function sb(t) {
  xg.delete(t[ra]);
}
var Zh = "__ngContext__";
function kn(t, e) {
  tr(e) ? ((t[Zh] = e[ra]), ob(e)) : (t[Zh] = e);
}
function Tg(t) {
  return Ng(t[Li]);
}
function Ag(t) {
  return Ng(t[xt]);
}
function Ng(t) {
  for (; t !== null && !gn(t); ) t = t[xt];
  return t;
}
var jc;
function Rg(t) {
  jc = t;
}
function ab() {
  if (jc !== void 0) return jc;
  if (typeof document < "u") return document;
  throw new _(210, !1);
}
var da = new S("", { providedIn: "root", factory: () => lb }),
  lb = "ng",
  Hu = new S(""),
  rt = new S("", { providedIn: "platform", factory: () => "unknown" });
var zu = new S("", {
  providedIn: "root",
  factory: () =>
    ab().body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce") ||
    null,
});
var cb = "h",
  ub = "b";
var db = () => null;
function Wu(t, e, r = !1) {
  return db(t, e, r);
}
var Og = !1,
  fb = new S("", { providedIn: "root", factory: () => Og });
var ms;
function hb() {
  if (ms === void 0 && ((ms = null), be.trustedTypes))
    try {
      ms = be.trustedTypes.createPolicy("angular", {
        createHTML: (t) => t,
        createScript: (t) => t,
        createScriptURL: (t) => t,
      });
    } catch {}
  return ms;
}
function fa(t) {
  return hb()?.createHTML(t) || t;
}
var ys;
function pb() {
  if (ys === void 0 && ((ys = null), be.trustedTypes))
    try {
      ys = be.trustedTypes.createPolicy("angular#unsafe-bypass", {
        createHTML: (t) => t,
        createScript: (t) => t,
        createScriptURL: (t) => t,
      });
    } catch {}
  return ys;
}
function Qh(t) {
  return pb()?.createScriptURL(t) || t;
}
var dn = class {
    constructor(e) {
      this.changingThisBreaksApplicationSecurity = e;
    }
    toString() {
      return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${bp})`;
    }
  },
  Bc = class extends dn {
    getTypeName() {
      return "HTML";
    }
  },
  $c = class extends dn {
    getTypeName() {
      return "Style";
    }
  },
  Uc = class extends dn {
    getTypeName() {
      return "Script";
    }
  },
  Hc = class extends dn {
    getTypeName() {
      return "URL";
    }
  },
  zc = class extends dn {
    getTypeName() {
      return "ResourceURL";
    }
  };
function Gt(t) {
  return t instanceof dn ? t.changingThisBreaksApplicationSecurity : t;
}
function jn(t, e) {
  let r = gb(t);
  if (r != null && r !== e) {
    if (r === "ResourceURL" && e === "URL") return !0;
    throw new Error(`Required a safe ${e}, got a ${r} (see ${bp})`);
  }
  return r === e;
}
function gb(t) {
  return (t instanceof dn && t.getTypeName()) || null;
}
function kg(t) {
  return new Bc(t);
}
function Pg(t) {
  return new $c(t);
}
function Fg(t) {
  return new Uc(t);
}
function Lg(t) {
  return new Hc(t);
}
function Vg(t) {
  return new zc(t);
}
function mb(t) {
  let e = new Gc(t);
  return yb() ? new Wc(e) : e;
}
var Wc = class {
    constructor(e) {
      this.inertDocumentHelper = e;
    }
    getInertBodyElement(e) {
      e = "<body><remove></remove>" + e;
      try {
        let r = new window.DOMParser().parseFromString(fa(e), "text/html").body;
        return r === null
          ? this.inertDocumentHelper.getInertBodyElement(e)
          : (r.removeChild(r.firstChild), r);
      } catch {
        return null;
      }
    }
  },
  Gc = class {
    constructor(e) {
      (this.defaultDoc = e),
        (this.inertDocument =
          this.defaultDoc.implementation.createHTMLDocument(
            "sanitization-inert"
          ));
    }
    getInertBodyElement(e) {
      let r = this.inertDocument.createElement("template");
      return (r.innerHTML = fa(e)), r;
    }
  };
function yb() {
  try {
    return !!new window.DOMParser().parseFromString(fa(""), "text/html");
  } catch {
    return !1;
  }
}
var vb = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
function ha(t) {
  return (t = String(t)), t.match(vb) ? t : "unsafe:" + t;
}
function yn(t) {
  let e = {};
  for (let r of t.split(",")) e[r] = !0;
  return e;
}
function qi(...t) {
  let e = {};
  for (let r of t) for (let n in r) r.hasOwnProperty(n) && (e[n] = !0);
  return e;
}
var jg = yn("area,br,col,hr,img,wbr"),
  Bg = yn("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),
  $g = yn("rp,rt"),
  Db = qi($g, Bg),
  wb = qi(
    Bg,
    yn(
      "address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul"
    )
  ),
  bb = qi(
    $g,
    yn(
      "a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video"
    )
  ),
  Yh = qi(jg, wb, bb, Db),
  Ug = yn("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),
  Cb = yn(
    "abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"
  ),
  Eb = yn(
    "aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"
  ),
  Ib = qi(Ug, Cb, Eb),
  _b = yn("script,style,template"),
  qc = class {
    constructor() {
      (this.sanitizedSomething = !1), (this.buf = []);
    }
    sanitizeChildren(e) {
      let r = e.firstChild,
        n = !0,
        i = [];
      for (; r; ) {
        if (
          (r.nodeType === Node.ELEMENT_NODE
            ? (n = this.startElement(r))
            : r.nodeType === Node.TEXT_NODE
            ? this.chars(r.nodeValue)
            : (this.sanitizedSomething = !0),
          n && r.firstChild)
        ) {
          i.push(r), (r = xb(r));
          continue;
        }
        for (; r; ) {
          r.nodeType === Node.ELEMENT_NODE && this.endElement(r);
          let o = Mb(r);
          if (o) {
            r = o;
            break;
          }
          r = i.pop();
        }
      }
      return this.buf.join("");
    }
    startElement(e) {
      let r = Kh(e).toLowerCase();
      if (!Yh.hasOwnProperty(r))
        return (this.sanitizedSomething = !0), !_b.hasOwnProperty(r);
      this.buf.push("<"), this.buf.push(r);
      let n = e.attributes;
      for (let i = 0; i < n.length; i++) {
        let o = n.item(i),
          s = o.name,
          a = s.toLowerCase();
        if (!Ib.hasOwnProperty(a)) {
          this.sanitizedSomething = !0;
          continue;
        }
        let l = o.value;
        Ug[a] && (l = ha(l)), this.buf.push(" ", s, '="', Xh(l), '"');
      }
      return this.buf.push(">"), !0;
    }
    endElement(e) {
      let r = Kh(e).toLowerCase();
      Yh.hasOwnProperty(r) &&
        !jg.hasOwnProperty(r) &&
        (this.buf.push("</"), this.buf.push(r), this.buf.push(">"));
    }
    chars(e) {
      this.buf.push(Xh(e));
    }
  };
function Sb(t, e) {
  return (
    (t.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY) !==
    Node.DOCUMENT_POSITION_CONTAINED_BY
  );
}
function Mb(t) {
  let e = t.nextSibling;
  if (e && t !== e.previousSibling) throw Hg(e);
  return e;
}
function xb(t) {
  let e = t.firstChild;
  if (e && Sb(t, e)) throw Hg(e);
  return e;
}
function Kh(t) {
  let e = t.nodeName;
  return typeof e == "string" ? e : "FORM";
}
function Hg(t) {
  return new Error(
    `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
  );
}
var Tb = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
  Ab = /([^\#-~ |!])/g;
function Xh(t) {
  return t
    .replace(/&/g, "&amp;")
    .replace(Tb, function (e) {
      let r = e.charCodeAt(0),
        n = e.charCodeAt(1);
      return "&#" + ((r - 55296) * 1024 + (n - 56320) + 65536) + ";";
    })
    .replace(Ab, function (e) {
      return "&#" + e.charCodeAt(0) + ";";
    })
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
var vs;
function zg(t, e) {
  let r = null;
  try {
    vs = vs || mb(t);
    let n = e ? String(e) : "";
    r = vs.getInertBodyElement(n);
    let i = 5,
      o = n;
    do {
      if (i === 0)
        throw new Error(
          "Failed to sanitize html because the input is unstable"
        );
      i--, (n = o), (o = r.innerHTML), (r = vs.getInertBodyElement(n));
    } while (n !== o);
    let a = new qc().sanitizeChildren(Jh(r) || r);
    return fa(a);
  } finally {
    if (r) {
      let n = Jh(r) || r;
      for (; n.firstChild; ) n.removeChild(n.firstChild);
    }
  }
}
function Jh(t) {
  return "content" in t && Nb(t) ? t.content : null;
}
function Nb(t) {
  return t.nodeType === Node.ELEMENT_NODE && t.nodeName === "TEMPLATE";
}
var vt = (function (t) {
  return (
    (t[(t.NONE = 0)] = "NONE"),
    (t[(t.HTML = 1)] = "HTML"),
    (t[(t.STYLE = 2)] = "STYLE"),
    (t[(t.SCRIPT = 3)] = "SCRIPT"),
    (t[(t.URL = 4)] = "URL"),
    (t[(t.RESOURCE_URL = 5)] = "RESOURCE_URL"),
    t
  );
})(vt || {});
function kt(t) {
  let e = Gg();
  return e ? e.sanitize(vt.URL, t) || "" : jn(t, "URL") ? Gt(t) : ha(Ks(t));
}
function Rb(t) {
  let e = Gg();
  if (e) return Qh(e.sanitize(vt.RESOURCE_URL, t) || "");
  if (jn(t, "ResourceURL")) return Qh(Gt(t));
  throw new _(904, !1);
}
function Ob(t, e) {
  return (e === "src" &&
    (t === "embed" ||
      t === "frame" ||
      t === "iframe" ||
      t === "media" ||
      t === "script")) ||
    (e === "href" && (t === "base" || t === "link"))
    ? Rb
    : kt;
}
function Wg(t, e, r) {
  return Ob(e, r)(t);
}
function Gg() {
  let t = U();
  return t && t[At].sanitizer;
}
var kb = /^>|^->|<!--|-->|--!>|<!-$/g,
  Pb = /(<|>)/g,
  Fb = "\u200B$1\u200B";
function Lb(t) {
  return t.replace(kb, (e) => e.replace(Pb, Fb));
}
function qg(t) {
  return t instanceof Function ? t() : t;
}
function Vb(t) {
  return (t ?? D(Ot)).get(rt) === "browser";
}
var fn = (function (t) {
    return (
      (t[(t.Important = 1)] = "Important"),
      (t[(t.DashCase = 2)] = "DashCase"),
      t
    );
  })(fn || {}),
  jb;
function Gu(t, e) {
  return jb(t, e);
}
function Fr(t, e, r, n, i) {
  if (n != null) {
    let o,
      s = !1;
    gn(n) ? (o = n) : tr(n) && ((s = !0), (n = n[pn]));
    let a = zt(n);
    t === 0 && r !== null
      ? i == null
        ? Jg(e, r, a)
        : Ls(e, r, a, i || null, !0)
      : t === 1 && r !== null
      ? Ls(e, r, a, i || null, !0)
      : t === 2
      ? tC(e, a, s)
      : t === 3 && e.destroyNode(a),
      o != null && rC(e, t, o, r, i);
  }
}
function Bb(t, e) {
  return t.createText(e);
}
function $b(t, e, r) {
  t.setValue(e, r);
}
function Ub(t, e) {
  return t.createComment(Lb(e));
}
function Zg(t, e, r) {
  return t.createElement(e, r);
}
function Hb(t, e) {
  Qg(t, e), (e[pn] = null), (e[lt] = null);
}
function zb(t, e, r, n, i, o) {
  (n[pn] = i), (n[lt] = e), ga(t, n, r, 1, i, o);
}
function Qg(t, e) {
  e[At].changeDetectionScheduler?.notify(1), ga(t, e, e[ye], 2, null, null);
}
function Wb(t) {
  let e = t[Li];
  if (!e) return gc(t[L], t);
  for (; e; ) {
    let r = null;
    if (tr(e)) r = e[Li];
    else {
      let n = e[at];
      n && (r = n);
    }
    if (!r) {
      for (; e && !e[xt] && e !== t; ) tr(e) && gc(e[L], e), (e = e[Le]);
      e === null && (e = t), tr(e) && gc(e[L], e), (r = e && e[xt]);
    }
    e = r;
  }
}
function Gb(t, e, r, n) {
  let i = at + n,
    o = r.length;
  n > 0 && (r[i - 1][xt] = e),
    n < o - at
      ? ((e[xt] = r[i]), Np(r, at + n, e))
      : (r.push(e), (e[xt] = null)),
    (e[Le] = r);
  let s = e[Wi];
  s !== null && r !== s && qb(s, e);
  let a = e[un];
  a !== null && a.insertView(t), Nc(e), (e[N] |= 128);
}
function qb(t, e) {
  let r = t[zr],
    i = e[Le][Le][Nt];
  e[Nt] !== i && (t[N] |= Au.HasTransplantedViews),
    r === null ? (t[zr] = [e]) : r.push(e);
}
function Yg(t, e) {
  let r = t[zr],
    n = r.indexOf(e);
  r.splice(n, 1);
}
function Zc(t, e) {
  if (t.length <= at) return;
  let r = at + e,
    n = t[r];
  if (n) {
    let i = n[Wi];
    i !== null && i !== t && Yg(i, n), e > 0 && (t[r - 1][xt] = n[xt]);
    let o = As(t, at + e);
    Hb(n[L], n);
    let s = o[un];
    s !== null && s.detachView(o[L]),
      (n[Le] = null),
      (n[xt] = null),
      (n[N] &= -129);
  }
  return n;
}
function Kg(t, e) {
  if (!(e[N] & 256)) {
    let r = e[ye];
    r.destroyNode && ga(t, e, r, 3, null, null), Wb(e);
  }
}
function gc(t, e) {
  if (e[N] & 256) return;
  let r = W(null);
  try {
    (e[N] &= -129),
      (e[N] |= 256),
      e[ir] && ih(e[ir]),
      Qb(t, e),
      Zb(t, e),
      e[L].type === 1 && e[ye].destroy();
    let n = e[Wi];
    if (n !== null && gn(e[Le])) {
      n !== e[Le] && Yg(n, e);
      let i = e[un];
      i !== null && i.detachView(t);
    }
    sb(e);
  } finally {
    W(r);
  }
}
function Zb(t, e) {
  let r = t.cleanup,
    n = e[Fi];
  if (r !== null)
    for (let o = 0; o < r.length - 1; o += 2)
      if (typeof r[o] == "string") {
        let s = r[o + 3];
        s >= 0 ? n[s]() : n[-s].unsubscribe(), (o += 2);
      } else {
        let s = n[r[o + 1]];
        r[o].call(s);
      }
  n !== null && (e[Fi] = null);
  let i = e[Nn];
  if (i !== null) {
    e[Nn] = null;
    for (let o = 0; o < i.length; o++) {
      let s = i[o];
      s();
    }
  }
}
function Qb(t, e) {
  let r;
  if (t != null && (r = t.destroyHooks) != null)
    for (let n = 0; n < r.length; n += 2) {
      let i = e[r[n]];
      if (!(i instanceof ar)) {
        let o = r[n + 1];
        if (Array.isArray(o))
          for (let s = 0; s < o.length; s += 2) {
            let a = i[o[s]],
              l = o[s + 1];
            $t(4, a, l);
            try {
              l.call(a);
            } finally {
              $t(5, a, l);
            }
          }
        else {
          $t(4, i, o);
          try {
            o.call(i);
          } finally {
            $t(5, i, o);
          }
        }
      }
    }
}
function Xg(t, e, r) {
  return Yb(t, e.parent, r);
}
function Yb(t, e, r) {
  let n = e;
  for (; n !== null && n.type & 40; ) (e = n), (n = e.parent);
  if (n === null) return r[pn];
  {
    let { componentOffset: i } = n;
    if (i > -1) {
      let { encapsulation: o } = t.data[n.directiveStart + i];
      if (o === Ht.None || o === Ht.Emulated) return null;
    }
    return yt(n, r);
  }
}
function Ls(t, e, r, n, i) {
  t.insertBefore(e, r, n, i);
}
function Jg(t, e, r) {
  t.appendChild(e, r);
}
function ep(t, e, r, n, i) {
  n !== null ? Ls(t, e, r, n, i) : Jg(t, e, r);
}
function Kb(t, e, r, n) {
  t.removeChild(e, r, n);
}
function qu(t, e) {
  return t.parentNode(e);
}
function Xb(t, e) {
  return t.nextSibling(e);
}
function em(t, e, r) {
  return eC(t, e, r);
}
function Jb(t, e, r) {
  return t.type & 40 ? yt(t, r) : null;
}
var eC = Jb,
  tp;
function pa(t, e, r, n) {
  let i = Xg(t, n, e),
    o = e[ye],
    s = n.parent || e[lt],
    a = em(s, n, e);
  if (i != null)
    if (Array.isArray(r))
      for (let l = 0; l < r.length; l++) ep(o, i, r[l], a, !1);
    else ep(o, i, r, a, !1);
  tp !== void 0 && tp(o, n, e, r, i);
}
function Ss(t, e) {
  if (e !== null) {
    let r = e.type;
    if (r & 3) return yt(e, t);
    if (r & 4) return Qc(-1, t[e.index]);
    if (r & 8) {
      let n = e.child;
      if (n !== null) return Ss(t, n);
      {
        let i = t[e.index];
        return gn(i) ? Qc(-1, i) : zt(i);
      }
    } else {
      if (r & 32) return Gu(e, t)() || zt(t[e.index]);
      {
        let n = tm(t, e);
        if (n !== null) {
          if (Array.isArray(n)) return n[0];
          let i = ji(t[Nt]);
          return Ss(i, n);
        } else return Ss(t, e.next);
      }
    }
  }
  return null;
}
function tm(t, e) {
  if (e !== null) {
    let n = t[Nt][lt],
      i = e.projection;
    return n.projection[i];
  }
  return null;
}
function Qc(t, e) {
  let r = at + t + 1;
  if (r < e.length) {
    let n = e[r],
      i = n[L].firstChild;
    if (i !== null) return Ss(n, i);
  }
  return e[or];
}
function tC(t, e, r) {
  let n = qu(t, e);
  n && Kb(t, n, e, r);
}
function Zu(t, e, r, n, i, o, s) {
  for (; r != null; ) {
    let a = n[r.index],
      l = r.type;
    if (
      (s && e === 0 && (a && kn(zt(a), n), (r.flags |= 2)),
      (r.flags & 32) !== 32)
    )
      if (l & 8) Zu(t, e, r.child, n, i, o, !1), Fr(e, t, i, a, o);
      else if (l & 32) {
        let c = Gu(r, n),
          u;
        for (; (u = c()); ) Fr(e, t, i, u, o);
        Fr(e, t, i, a, o);
      } else l & 16 ? nm(t, e, n, r, i, o) : Fr(e, t, i, a, o);
    r = s ? r.projectionNext : r.next;
  }
}
function ga(t, e, r, n, i, o) {
  Zu(r, n, t.firstChild, e, i, o, !1);
}
function nC(t, e, r) {
  let n = e[ye],
    i = Xg(t, r, e),
    o = r.parent || e[lt],
    s = em(o, r, e);
  nm(n, 0, e, r, i, s);
}
function nm(t, e, r, n, i, o) {
  let s = r[Nt],
    l = s[lt].projection[n.projection];
  if (Array.isArray(l))
    for (let c = 0; c < l.length; c++) {
      let u = l[c];
      Fr(e, t, i, u, o);
    }
  else {
    let c = l,
      u = s[Le];
    Mg(n) && (c.flags |= 128), Zu(t, e, c, u, i, o, !0);
  }
}
function rC(t, e, r, n, i) {
  let o = r[or],
    s = zt(r);
  o !== s && Fr(e, t, n, o, i);
  for (let a = at; a < r.length; a++) {
    let l = r[a];
    ga(l[L], l, t, e, n, o);
  }
}
function iC(t, e, r, n, i) {
  if (e) i ? t.addClass(r, n) : t.removeClass(r, n);
  else {
    let o = n.indexOf("-") === -1 ? void 0 : fn.DashCase;
    i == null
      ? t.removeStyle(r, n, o)
      : (typeof i == "string" &&
          i.endsWith("!important") &&
          ((i = i.slice(0, -10)), (o |= fn.Important)),
        t.setStyle(r, n, i, o));
  }
}
function oC(t, e, r) {
  t.setAttribute(e, "style", r);
}
function rm(t, e, r) {
  r === "" ? t.removeAttribute(e, "class") : t.setAttribute(e, "class", r);
}
function im(t, e, r) {
  let { mergedAttrs: n, classes: i, styles: o } = r;
  n !== null && Sc(t, e, n),
    i !== null && rm(t, e, i),
    o !== null && oC(t, e, o);
}
var vn = {};
function y(t = 1) {
  om(Se(), U(), Qr() + t, !1);
}
function om(t, e, r, n) {
  if (!n)
    if ((e[N] & 3) === 3) {
      let o = t.preOrderCheckHooks;
      o !== null && Es(e, o, r);
    } else {
      let o = t.preOrderHooks;
      o !== null && Is(e, o, 0, r);
    }
  sr(r);
}
function w(t, e = $.Default) {
  let r = U();
  if (r === null) return b(t, e);
  let n = Ye();
  return Cg(n, r, qe(t), e);
}
function sm() {
  let t = "invalid";
  throw new Error(t);
}
function am(t, e, r, n, i, o) {
  let s = W(null);
  try {
    let a = null;
    i & Fe.SignalBased && (a = e[n][jl]),
      a !== null && a.transformFn !== void 0 && (o = a.transformFn(o)),
      i & Fe.HasDecoratorInputTransform &&
        (o = t.inputTransforms[n].call(e, o)),
      t.setInput !== null ? t.setInput(e, a, o, r, n) : Kp(e, a, n, o);
  } finally {
    W(s);
  }
}
function sC(t, e) {
  let r = t.hostBindingOpCodes;
  if (r !== null)
    try {
      for (let n = 0; n < r.length; n++) {
        let i = r[n];
        if (i < 0) sr(~i);
        else {
          let o = i,
            s = r[++n],
            a = r[++n];
          Rw(s, o);
          let l = e[o];
          a(2, l);
        }
      }
    } finally {
      sr(-1);
    }
}
function ma(t, e, r, n, i, o, s, a, l, c, u) {
  let d = e.blueprint.slice();
  return (
    (d[pn] = i),
    (d[N] = n | 4 | 128 | 8 | 64),
    (c !== null || (t && t[N] & 2048)) && (d[N] |= 2048),
    rg(d),
    (d[Le] = d[Zr] = t),
    (d[Tt] = r),
    (d[At] = s || (t && t[At])),
    (d[ye] = a || (t && t[ye])),
    (d[Hr] = l || (t && t[Hr]) || null),
    (d[lt] = o),
    (d[ra] = ib()),
    (d[Pi] = u),
    (d[Qp] = c),
    (d[Nt] = e.type == 2 ? t[Nt] : d),
    d
  );
}
function Kr(t, e, r, n, i) {
  let o = t.data[e];
  if (o === null) (o = aC(t, e, r, n, i)), Nw() && (o.flags |= 32);
  else if (o.type & 64) {
    (o.type = r), (o.value = n), (o.attrs = i);
    let s = Mw();
    o.injectorIndex = s === null ? -1 : s.injectorIndex;
  }
  return fr(o, !0), o;
}
function aC(t, e, r, n, i) {
  let o = ag(),
    s = Pu(),
    a = s ? o : o && o.parent,
    l = (t.data[e] = hC(t, a, r, e, n, i));
  return (
    t.firstChild === null && (t.firstChild = l),
    o !== null &&
      (s
        ? o.child == null && l.parent !== null && (o.child = l)
        : o.next === null && ((o.next = l), (l.prev = o))),
    l
  );
}
function lm(t, e, r, n) {
  if (r === 0) return -1;
  let i = e.length;
  for (let o = 0; o < r; o++) e.push(n), t.blueprint.push(n), t.data.push(null);
  return i;
}
function cm(t, e, r, n, i) {
  let o = Qr(),
    s = n & 2;
  try {
    sr(-1), s && e.length > nt && om(t, e, nt, !1), $t(s ? 2 : 0, i), r(n, i);
  } finally {
    sr(o), $t(s ? 3 : 1, i);
  }
}
function Qu(t, e, r) {
  if (Nu(e)) {
    let n = W(null);
    try {
      let i = e.directiveStart,
        o = e.directiveEnd;
      for (let s = i; s < o; s++) {
        let a = t.data[s];
        if (a.contentQueries) {
          let l = r[s];
          a.contentQueries(1, l, s);
        }
      }
    } finally {
      W(n);
    }
  }
}
function Yu(t, e, r) {
  og() && (DC(t, e, r, yt(r, e)), (r.flags & 64) === 64 && fm(t, e, r));
}
function Ku(t, e, r = yt) {
  let n = e.localNames;
  if (n !== null) {
    let i = e.index + 1;
    for (let o = 0; o < n.length; o += 2) {
      let s = n[o + 1],
        a = s === -1 ? r(e, t) : t[s];
      t[i++] = a;
    }
  }
}
function um(t) {
  let e = t.tView;
  return e === null || e.incompleteFirstPass
    ? (t.tView = Xu(
        1,
        null,
        t.template,
        t.decls,
        t.vars,
        t.directiveDefs,
        t.pipeDefs,
        t.viewQuery,
        t.schemas,
        t.consts,
        t.id
      ))
    : e;
}
function Xu(t, e, r, n, i, o, s, a, l, c, u) {
  let d = nt + n,
    f = d + i,
    g = lC(d, f),
    C = typeof c == "function" ? c() : c;
  return (g[L] = {
    type: t,
    blueprint: g,
    template: r,
    queries: null,
    viewQuery: a,
    declTNode: e,
    data: g.slice().fill(null, d),
    bindingStartIndex: d,
    expandoStartIndex: f,
    hostBindingOpCodes: null,
    firstCreatePass: !0,
    firstUpdatePass: !0,
    staticViewQueries: !1,
    staticContentQueries: !1,
    preOrderHooks: null,
    preOrderCheckHooks: null,
    contentHooks: null,
    contentCheckHooks: null,
    viewHooks: null,
    viewCheckHooks: null,
    destroyHooks: null,
    cleanup: null,
    contentQueries: null,
    components: null,
    directiveRegistry: typeof o == "function" ? o() : o,
    pipeRegistry: typeof s == "function" ? s() : s,
    firstChild: null,
    schemas: l,
    consts: C,
    incompleteFirstPass: !1,
    ssrId: u,
  });
}
function lC(t, e) {
  let r = [];
  for (let n = 0; n < e; n++) r.push(n < t ? null : vn);
  return r;
}
function cC(t, e, r, n) {
  let o = n.get(fb, Og) || r === Ht.ShadowDom,
    s = t.selectRootElement(e, o);
  return uC(s), s;
}
function uC(t) {
  dC(t);
}
var dC = () => null;
function fC(t, e, r, n) {
  let i = gm(e);
  i.push(r), t.firstCreatePass && mm(t).push(n, i.length - 1);
}
function hC(t, e, r, n, i, o) {
  let s = e ? e.injectorIndex : -1,
    a = 0;
  return (
    sg() && (a |= 128),
    {
      type: r,
      index: n,
      insertBeforeIndex: null,
      injectorIndex: s,
      directiveStart: -1,
      directiveEnd: -1,
      directiveStylingLast: -1,
      componentOffset: -1,
      propertyBindings: null,
      flags: a,
      providerIndexes: 0,
      value: i,
      attrs: o,
      mergedAttrs: null,
      localNames: null,
      initialInputs: void 0,
      inputs: null,
      outputs: null,
      tView: null,
      next: null,
      prev: null,
      projectionNext: null,
      child: null,
      parent: e,
      projection: null,
      styles: null,
      stylesWithoutHost: null,
      residualStyles: void 0,
      classes: null,
      classesWithoutHost: null,
      residualClasses: void 0,
      classBindings: 0,
      styleBindings: 0,
    }
  );
}
function np(t, e, r, n, i) {
  for (let o in e) {
    if (!e.hasOwnProperty(o)) continue;
    let s = e[o];
    if (s === void 0) continue;
    n ??= {};
    let a,
      l = Fe.None;
    Array.isArray(s) ? ((a = s[0]), (l = s[1])) : (a = s);
    let c = o;
    if (i !== null) {
      if (!i.hasOwnProperty(o)) continue;
      c = i[o];
    }
    t === 0 ? rp(n, r, c, a, l) : rp(n, r, c, a);
  }
  return n;
}
function rp(t, e, r, n, i) {
  let o;
  t.hasOwnProperty(r) ? (o = t[r]).push(e, n) : (o = t[r] = [e, n]),
    i !== void 0 && o.push(i);
}
function pC(t, e, r) {
  let n = e.directiveStart,
    i = e.directiveEnd,
    o = t.data,
    s = e.attrs,
    a = [],
    l = null,
    c = null;
  for (let u = n; u < i; u++) {
    let d = o[u],
      f = r ? r.get(d) : null,
      g = f ? f.inputs : null,
      C = f ? f.outputs : null;
    (l = np(0, d.inputs, u, l, g)), (c = np(1, d.outputs, u, c, C));
    let I = l !== null && s !== null && !Mu(e) ? AC(l, u, s) : null;
    a.push(I);
  }
  l !== null &&
    (l.hasOwnProperty("class") && (e.flags |= 8),
    l.hasOwnProperty("style") && (e.flags |= 16)),
    (e.initialInputs = a),
    (e.inputs = l),
    (e.outputs = c);
}
function gC(t) {
  return t === "class"
    ? "className"
    : t === "for"
    ? "htmlFor"
    : t === "formaction"
    ? "formAction"
    : t === "innerHtml"
    ? "innerHTML"
    : t === "readonly"
    ? "readOnly"
    : t === "tabindex"
    ? "tabIndex"
    : t;
}
function Ju(t, e, r, n, i, o, s, a) {
  let l = yt(e, r),
    c = e.inputs,
    u;
  !a && c != null && (u = c[n])
    ? (td(t, r, u, n, i), ia(e) && mC(r, e.index))
    : e.type & 3
    ? ((n = gC(n)),
      (i = s != null ? s(i, e.value || "", n) : i),
      o.setProperty(l, n, i))
    : e.type & 12;
}
function mC(t, e) {
  let r = Ln(e, t);
  r[N] & 16 || (r[N] |= 64);
}
function ed(t, e, r, n) {
  if (og()) {
    let i = n === null ? null : { "": -1 },
      o = bC(t, r),
      s,
      a;
    o === null ? (s = a = null) : ([s, a] = o),
      s !== null && dm(t, e, r, s, i, a),
      i && CC(r, n, i);
  }
  r.mergedAttrs = Oi(r.mergedAttrs, r.attrs);
}
function dm(t, e, r, n, i, o) {
  for (let c = 0; c < n.length; c++) kc(Fs(r, e), t, n[c].type);
  IC(r, t.data.length, n.length);
  for (let c = 0; c < n.length; c++) {
    let u = n[c];
    u.providersResolver && u.providersResolver(u);
  }
  let s = !1,
    a = !1,
    l = lm(t, e, n.length, null);
  for (let c = 0; c < n.length; c++) {
    let u = n[c];
    (r.mergedAttrs = Oi(r.mergedAttrs, u.hostAttrs)),
      _C(t, r, e, l, u),
      EC(l, u, i),
      u.contentQueries !== null && (r.flags |= 4),
      (u.hostBindings !== null || u.hostAttrs !== null || u.hostVars !== 0) &&
        (r.flags |= 64);
    let d = u.type.prototype;
    !s &&
      (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
      ((t.preOrderHooks ??= []).push(r.index), (s = !0)),
      !a &&
        (d.ngOnChanges || d.ngDoCheck) &&
        ((t.preOrderCheckHooks ??= []).push(r.index), (a = !0)),
      l++;
  }
  pC(t, r, o);
}
function yC(t, e, r, n, i) {
  let o = i.hostBindings;
  if (o) {
    let s = t.hostBindingOpCodes;
    s === null && (s = t.hostBindingOpCodes = []);
    let a = ~e.index;
    vC(s) != a && s.push(a), s.push(r, n, o);
  }
}
function vC(t) {
  let e = t.length;
  for (; e > 0; ) {
    let r = t[--e];
    if (typeof r == "number" && r < 0) return r;
  }
  return 0;
}
function DC(t, e, r, n) {
  let i = r.directiveStart,
    o = r.directiveEnd;
  ia(r) && SC(e, r, t.data[i + r.componentOffset]),
    t.firstCreatePass || Fs(r, e),
    kn(n, e);
  let s = r.initialInputs;
  for (let a = i; a < o; a++) {
    let l = t.data[a],
      c = lr(e, t, a, r);
    if ((kn(c, e), s !== null && TC(e, a - i, c, l, r, s), On(l))) {
      let u = Ln(r.index, e);
      u[Tt] = lr(e, t, a, r);
    }
  }
}
function fm(t, e, r) {
  let n = r.directiveStart,
    i = r.directiveEnd,
    o = r.index,
    s = Ow();
  try {
    sr(o);
    for (let a = n; a < i; a++) {
      let l = t.data[a],
        c = e[a];
      Rc(a),
        (l.hostBindings !== null || l.hostVars !== 0 || l.hostAttrs !== null) &&
          wC(l, c);
    }
  } finally {
    sr(-1), Rc(s);
  }
}
function wC(t, e) {
  t.hostBindings !== null && t.hostBindings(1, e);
}
function bC(t, e) {
  let r = t.directiveRegistry,
    n = null,
    i = null;
  if (r)
    for (let o = 0; o < r.length; o++) {
      let s = r[o];
      if (Lp(e, s.selectors, !1))
        if ((n || (n = []), On(s)))
          if (s.findHostDirectiveDefs !== null) {
            let a = [];
            (i = i || new Map()),
              s.findHostDirectiveDefs(s, a, i),
              n.unshift(...a, s);
            let l = a.length;
            Yc(t, e, l);
          } else n.unshift(s), Yc(t, e, 0);
        else
          (i = i || new Map()), s.findHostDirectiveDefs?.(s, n, i), n.push(s);
    }
  return n === null ? null : [n, i];
}
function Yc(t, e, r) {
  (e.componentOffset = r), (t.components ??= []).push(e.index);
}
function CC(t, e, r) {
  if (e) {
    let n = (t.localNames = []);
    for (let i = 0; i < e.length; i += 2) {
      let o = r[e[i + 1]];
      if (o == null) throw new _(-301, !1);
      n.push(e[i], o);
    }
  }
}
function EC(t, e, r) {
  if (r) {
    if (e.exportAs)
      for (let n = 0; n < e.exportAs.length; n++) r[e.exportAs[n]] = t;
    On(e) && (r[""] = t);
  }
}
function IC(t, e, r) {
  (t.flags |= 1),
    (t.directiveStart = e),
    (t.directiveEnd = e + r),
    (t.providerIndexes = e);
}
function _C(t, e, r, n, i) {
  t.data[n] = i;
  let o = i.factory || (i.factory = rr(i.type, !0)),
    s = new ar(o, On(i), w);
  (t.blueprint[n] = s), (r[n] = s), yC(t, e, n, lm(t, r, i.hostVars, vn), i);
}
function SC(t, e, r) {
  let n = yt(e, t),
    i = um(r),
    o = t[At].rendererFactory,
    s = 16;
  r.signals ? (s = 4096) : r.onPush && (s = 64);
  let a = ya(
    t,
    ma(t, i, null, s, n, e, null, o.createRenderer(n, r), null, null, null)
  );
  t[e.index] = a;
}
function MC(t, e, r, n, i, o) {
  let s = yt(t, e);
  xC(e[ye], s, o, t.value, r, n, i);
}
function xC(t, e, r, n, i, o, s) {
  if (o == null) t.removeAttribute(e, i, r);
  else {
    let a = s == null ? Ks(o) : s(o, n || "", i);
    t.setAttribute(e, i, a, r);
  }
}
function TC(t, e, r, n, i, o) {
  let s = o[e];
  if (s !== null)
    for (let a = 0; a < s.length; ) {
      let l = s[a++],
        c = s[a++],
        u = s[a++],
        d = s[a++];
      am(n, r, l, c, u, d);
    }
}
function AC(t, e, r) {
  let n = null,
    i = 0;
  for (; i < r.length; ) {
    let o = r[i];
    if (o === 0) {
      i += 4;
      continue;
    } else if (o === 5) {
      i += 2;
      continue;
    }
    if (typeof o == "number") break;
    if (t.hasOwnProperty(o)) {
      n === null && (n = []);
      let s = t[o];
      for (let a = 0; a < s.length; a += 3)
        if (s[a] === e) {
          n.push(o, s[a + 1], s[a + 2], r[i + 1]);
          break;
        }
    }
    i += 2;
  }
  return n;
}
function hm(t, e, r, n) {
  return [t, !0, 0, e, null, n, null, r, null, null];
}
function pm(t, e) {
  let r = t.contentQueries;
  if (r !== null) {
    let n = W(null);
    try {
      for (let i = 0; i < r.length; i += 2) {
        let o = r[i],
          s = r[i + 1];
        if (s !== -1) {
          let a = t.data[s];
          Lu(o), a.contentQueries(2, e[s], s);
        }
      }
    } finally {
      W(n);
    }
  }
}
function ya(t, e) {
  return t[Li] ? (t[Uh][xt] = e) : (t[Li] = e), (t[Uh] = e), e;
}
function Kc(t, e, r) {
  Lu(0);
  let n = W(null);
  try {
    e(t, r);
  } finally {
    W(n);
  }
}
function gm(t) {
  return t[Fi] || (t[Fi] = []);
}
function mm(t) {
  return t.cleanup || (t.cleanup = []);
}
function ym(t, e) {
  let r = t[Hr],
    n = r ? r.get(Wt, null) : null;
  n && n.handleError(e);
}
function td(t, e, r, n, i) {
  for (let o = 0; o < r.length; ) {
    let s = r[o++],
      a = r[o++],
      l = r[o++],
      c = e[s],
      u = t.data[s];
    am(u, c, n, a, l, i);
  }
}
function NC(t, e, r) {
  let n = tg(e, t);
  $b(t[ye], n, r);
}
function RC(t, e) {
  let r = Ln(e, t),
    n = r[L];
  OC(n, r);
  let i = r[pn];
  i !== null && r[Pi] === null && (r[Pi] = Wu(i, r[Hr])), nd(n, r, r[Tt]);
}
function OC(t, e) {
  for (let r = e.length; r < t.blueprint.length; r++) e.push(t.blueprint[r]);
}
function nd(t, e, r) {
  Vu(e);
  try {
    let n = t.viewQuery;
    n !== null && Kc(1, n, r);
    let i = t.template;
    i !== null && cm(t, e, i, 1, r),
      t.firstCreatePass && (t.firstCreatePass = !1),
      e[un]?.finishViewCreation(t),
      t.staticContentQueries && pm(t, e),
      t.staticViewQueries && Kc(2, t.viewQuery, r);
    let o = t.components;
    o !== null && kC(e, o);
  } catch (n) {
    throw (
      (t.firstCreatePass &&
        ((t.incompleteFirstPass = !0), (t.firstCreatePass = !1)),
      n)
    );
  } finally {
    (e[N] &= -5), ju();
  }
}
function kC(t, e) {
  for (let r = 0; r < e.length; r++) RC(t, e[r]);
}
function PC(t, e, r, n) {
  let i = W(null);
  try {
    let o = e.tView,
      a = t[N] & 4096 ? 4096 : 16,
      l = ma(
        t,
        o,
        r,
        a,
        null,
        e,
        null,
        null,
        n?.injector ?? null,
        n?.embeddedViewInjector ?? null,
        n?.dehydratedView ?? null
      ),
      c = t[e.index];
    l[Wi] = c;
    let u = t[un];
    return u !== null && (l[un] = u.createEmbeddedView(o)), nd(o, l, r), l;
  } finally {
    W(i);
  }
}
function ip(t, e) {
  return !e || e.firstChild === null || Mg(t);
}
function FC(t, e, r, n = !0) {
  let i = e[L];
  if ((Gb(i, e, t, r), n)) {
    let s = Qc(r, t),
      a = e[ye],
      l = qu(a, t[or]);
    l !== null && zb(i, t[lt], a, e, l, s);
  }
  let o = e[Pi];
  o !== null && o.firstChild !== null && (o.firstChild = null);
}
function Vs(t, e, r, n, i = !1) {
  for (; r !== null; ) {
    let o = e[r.index];
    o !== null && n.push(zt(o)), gn(o) && LC(o, n);
    let s = r.type;
    if (s & 8) Vs(t, e, r.child, n);
    else if (s & 32) {
      let a = Gu(r, e),
        l;
      for (; (l = a()); ) n.push(l);
    } else if (s & 16) {
      let a = tm(e, r);
      if (Array.isArray(a)) n.push(...a);
      else {
        let l = ji(e[Nt]);
        Vs(l[L], l, a, n, !0);
      }
    }
    r = i ? r.projectionNext : r.next;
  }
  return n;
}
function LC(t, e) {
  for (let r = at; r < t.length; r++) {
    let n = t[r],
      i = n[L].firstChild;
    i !== null && Vs(n[L], n, i, e);
  }
  t[or] !== t[pn] && e.push(t[or]);
}
var vm = [];
function VC(t) {
  return t[ir] ?? jC(t);
}
function jC(t) {
  let e = vm.pop() ?? Object.create($C);
  return (e.lView = t), e;
}
function BC(t) {
  t.lView[ir] !== t && ((t.lView = null), vm.push(t));
}
var $C = Z(v({}, th), {
    consumerIsAlwaysLive: !0,
    consumerMarkedDirty: (t) => {
      Vi(t.lView);
    },
    consumerOnSignalRead() {
      this.lView[ir] = this;
    },
  }),
  Dm = 100;
function wm(t, e = !0, r = 0) {
  let n = t[At],
    i = n.rendererFactory,
    o = !1;
  o || i.begin?.();
  try {
    UC(t, r);
  } catch (s) {
    throw (e && ym(t, s), s);
  } finally {
    o || (i.end?.(), n.inlineEffectRunner?.flush());
  }
}
function UC(t, e) {
  Xc(t, e);
  let r = 0;
  for (; ku(t); ) {
    if (r === Dm) throw new _(103, !1);
    r++, Xc(t, 1);
  }
}
function HC(t, e, r, n) {
  let i = e[N];
  if ((i & 256) === 256) return;
  let o = !1;
  !o && e[At].inlineEffectRunner?.flush(), Vu(e);
  let s = null,
    a = null;
  !o && zC(t) && ((a = VC(e)), (s = nh(a)));
  try {
    rg(e), Tw(t.bindingStartIndex), r !== null && cm(t, e, r, 2, n);
    let l = (i & 3) === 3;
    if (!o)
      if (l) {
        let d = t.preOrderCheckHooks;
        d !== null && Es(e, d, null);
      } else {
        let d = t.preOrderHooks;
        d !== null && Is(e, d, 0, null), dc(e, 0);
      }
    if ((WC(e), bm(e, 0), t.contentQueries !== null && pm(t, e), !o))
      if (l) {
        let d = t.contentCheckHooks;
        d !== null && Es(e, d);
      } else {
        let d = t.contentHooks;
        d !== null && Is(e, d, 1), dc(e, 1);
      }
    sC(t, e);
    let c = t.components;
    c !== null && Em(e, c, 0);
    let u = t.viewQuery;
    if ((u !== null && Kc(2, u, n), !o))
      if (l) {
        let d = t.viewCheckHooks;
        d !== null && Es(e, d);
      } else {
        let d = t.viewHooks;
        d !== null && Is(e, d, 2), dc(e, 2);
      }
    if ((t.firstUpdatePass === !0 && (t.firstUpdatePass = !1), e[uc])) {
      for (let d of e[uc]) d();
      e[uc] = null;
    }
    o || (e[N] &= -73);
  } catch (l) {
    throw (Vi(e), l);
  } finally {
    a !== null && (rh(a, s), BC(a)), ju();
  }
}
function zC(t) {
  return t.type !== 2;
}
function bm(t, e) {
  for (let r = Tg(t); r !== null; r = Ag(r))
    for (let n = at; n < r.length; n++) {
      let i = r[n];
      Cm(i, e);
    }
}
function WC(t) {
  for (let e = Tg(t); e !== null; e = Ag(e)) {
    if (!(e[N] & Au.HasTransplantedViews)) continue;
    let r = e[zr];
    for (let n = 0; n < r.length; n++) {
      let i = r[n],
        o = i[Le];
      Dw(i);
    }
  }
}
function GC(t, e, r) {
  let n = Ln(e, t);
  Cm(n, r);
}
function Cm(t, e) {
  Ou(t) && Xc(t, e);
}
function Xc(t, e) {
  let n = t[L],
    i = t[N],
    o = t[ir],
    s = !!(e === 0 && i & 16);
  if (
    ((s ||= !!(i & 64 && e === 0)),
    (s ||= !!(i & 1024)),
    (s ||= !!(o?.dirty && Bl(o))),
    o && (o.dirty = !1),
    (t[N] &= -9217),
    s)
  )
    HC(n, t, n.template, t[Tt]);
  else if (i & 8192) {
    bm(t, 1);
    let a = n.components;
    a !== null && Em(t, a, 1);
  }
}
function Em(t, e, r) {
  for (let n = 0; n < e.length; n++) GC(t, e[n], r);
}
function rd(t) {
  for (t[At].changeDetectionScheduler?.notify(); t; ) {
    t[N] |= 64;
    let e = ji(t);
    if (cw(t) && !e) return t;
    t = e;
  }
  return null;
}
var cr = class {
    get rootNodes() {
      let e = this._lView,
        r = e[L];
      return Vs(r, e, r.firstChild, []);
    }
    constructor(e, r, n = !0) {
      (this._lView = e),
        (this._cdRefInjectingView = r),
        (this.notifyErrorHandler = n),
        (this._appRef = null),
        (this._attachedToViewContainer = !1);
    }
    get context() {
      return this._lView[Tt];
    }
    set context(e) {
      this._lView[Tt] = e;
    }
    get destroyed() {
      return (this._lView[N] & 256) === 256;
    }
    destroy() {
      if (this._appRef) this._appRef.detachView(this);
      else if (this._attachedToViewContainer) {
        let e = this._lView[Le];
        if (gn(e)) {
          let r = e[Rs],
            n = r ? r.indexOf(this) : -1;
          n > -1 && (Zc(e, n), As(r, n));
        }
        this._attachedToViewContainer = !1;
      }
      Kg(this._lView[L], this._lView);
    }
    onDestroy(e) {
      ig(this._lView, e);
    }
    markForCheck() {
      rd(this._cdRefInjectingView || this._lView);
    }
    detach() {
      this._lView[N] &= -129;
    }
    reattach() {
      Nc(this._lView), (this._lView[N] |= 128);
    }
    detectChanges() {
      (this._lView[N] |= 1024), wm(this._lView, this.notifyErrorHandler);
    }
    checkNoChanges() {}
    attachToViewContainerRef() {
      if (this._appRef) throw new _(902, !1);
      this._attachedToViewContainer = !0;
    }
    detachFromAppRef() {
      (this._appRef = null), Qg(this._lView[L], this._lView);
    }
    attachToAppRef(e) {
      if (this._attachedToViewContainer) throw new _(902, !1);
      (this._appRef = e), Nc(this._lView);
    }
  },
  ur = (() => {
    let e = class e {};
    e.__NG_ELEMENT_ID__ = QC;
    let t = e;
    return t;
  })(),
  qC = ur,
  ZC = class extends qC {
    constructor(e, r, n) {
      super(),
        (this._declarationLView = e),
        (this._declarationTContainer = r),
        (this.elementRef = n);
    }
    get ssrId() {
      return this._declarationTContainer.tView?.ssrId || null;
    }
    createEmbeddedView(e, r) {
      return this.createEmbeddedViewImpl(e, r);
    }
    createEmbeddedViewImpl(e, r, n) {
      let i = PC(this._declarationLView, this._declarationTContainer, e, {
        embeddedViewInjector: r,
        dehydratedView: n,
      });
      return new cr(i);
    }
  };
function QC() {
  return va(Ye(), U());
}
function va(t, e) {
  return t.type & 4 ? new ZC(e, t, Yr(t, e)) : null;
}
var EF = new RegExp(`^(\\d+)*(${ub}|${cb})*(.*)`);
var YC = () => null;
function op(t, e) {
  return YC(t, e);
}
var js = class {},
  Jc = class {},
  Bs = class {};
function KC(t) {
  let e = Error(`No component factory found for ${Ze(t)}.`);
  return (e[XC] = t), e;
}
var XC = "ngComponent";
var eu = class {
    resolveComponentFactory(e) {
      throw KC(e);
    }
  },
  Da = (() => {
    let e = class e {};
    e.NULL = new eu();
    let t = e;
    return t;
  })(),
  Bi = class {},
  qt = (() => {
    let e = class e {
      constructor() {
        this.destroyNode = null;
      }
    };
    e.__NG_ELEMENT_ID__ = () => JC();
    let t = e;
    return t;
  })();
function JC() {
  let t = U(),
    e = Ye(),
    r = Ln(e.index, t);
  return (tr(r) ? r : t)[ye];
}
var eE = (() => {
    let e = class e {};
    e.ɵprov = E({ token: e, providedIn: "root", factory: () => null });
    let t = e;
    return t;
  })(),
  mc = {};
var sp = new Set();
function wa(t) {
  sp.has(t) ||
    (sp.add(t),
    performance?.mark?.("mark_feature_usage", { detail: { feature: t } }));
}
function ap(...t) {}
function tE() {
  let t = typeof be.requestAnimationFrame == "function",
    e = be[t ? "requestAnimationFrame" : "setTimeout"],
    r = be[t ? "cancelAnimationFrame" : "clearTimeout"];
  if (typeof Zone < "u" && e && r) {
    let n = e[Zone.__symbol__("OriginalDelegate")];
    n && (e = n);
    let i = r[Zone.__symbol__("OriginalDelegate")];
    i && (r = i);
  }
  return { nativeRequestAnimationFrame: e, nativeCancelAnimationFrame: r };
}
var ie = class t {
    constructor({
      enableLongStackTrace: e = !1,
      shouldCoalesceEventChangeDetection: r = !1,
      shouldCoalesceRunChangeDetection: n = !1,
    }) {
      if (
        ((this.hasPendingMacrotasks = !1),
        (this.hasPendingMicrotasks = !1),
        (this.isStable = !0),
        (this.onUnstable = new pe(!1)),
        (this.onMicrotaskEmpty = new pe(!1)),
        (this.onStable = new pe(!1)),
        (this.onError = new pe(!1)),
        typeof Zone > "u")
      )
        throw new _(908, !1);
      Zone.assertZonePatched();
      let i = this;
      (i._nesting = 0),
        (i._outer = i._inner = Zone.current),
        Zone.TaskTrackingZoneSpec &&
          (i._inner = i._inner.fork(new Zone.TaskTrackingZoneSpec())),
        e &&
          Zone.longStackTraceZoneSpec &&
          (i._inner = i._inner.fork(Zone.longStackTraceZoneSpec)),
        (i.shouldCoalesceEventChangeDetection = !n && r),
        (i.shouldCoalesceRunChangeDetection = n),
        (i.lastRequestAnimationFrameId = -1),
        (i.nativeRequestAnimationFrame = tE().nativeRequestAnimationFrame),
        iE(i);
    }
    static isInAngularZone() {
      return typeof Zone < "u" && Zone.current.get("isAngularZone") === !0;
    }
    static assertInAngularZone() {
      if (!t.isInAngularZone()) throw new _(909, !1);
    }
    static assertNotInAngularZone() {
      if (t.isInAngularZone()) throw new _(909, !1);
    }
    run(e, r, n) {
      return this._inner.run(e, r, n);
    }
    runTask(e, r, n, i) {
      let o = this._inner,
        s = o.scheduleEventTask("NgZoneEvent: " + i, e, nE, ap, ap);
      try {
        return o.runTask(s, r, n);
      } finally {
        o.cancelTask(s);
      }
    }
    runGuarded(e, r, n) {
      return this._inner.runGuarded(e, r, n);
    }
    runOutsideAngular(e) {
      return this._outer.run(e);
    }
  },
  nE = {};
function id(t) {
  if (t._nesting == 0 && !t.hasPendingMicrotasks && !t.isStable)
    try {
      t._nesting++, t.onMicrotaskEmpty.emit(null);
    } finally {
      if ((t._nesting--, !t.hasPendingMicrotasks))
        try {
          t.runOutsideAngular(() => t.onStable.emit(null));
        } finally {
          t.isStable = !0;
        }
    }
}
function rE(t) {
  t.isCheckStableRunning ||
    t.lastRequestAnimationFrameId !== -1 ||
    ((t.lastRequestAnimationFrameId = t.nativeRequestAnimationFrame.call(
      be,
      () => {
        t.fakeTopEventTask ||
          (t.fakeTopEventTask = Zone.root.scheduleEventTask(
            "fakeTopEventTask",
            () => {
              (t.lastRequestAnimationFrameId = -1),
                tu(t),
                (t.isCheckStableRunning = !0),
                id(t),
                (t.isCheckStableRunning = !1);
            },
            void 0,
            () => {},
            () => {}
          )),
          t.fakeTopEventTask.invoke();
      }
    )),
    tu(t));
}
function iE(t) {
  let e = () => {
    rE(t);
  };
  t._inner = t._inner.fork({
    name: "angular",
    properties: { isAngularZone: !0 },
    onInvokeTask: (r, n, i, o, s, a) => {
      if (oE(a)) return r.invokeTask(i, o, s, a);
      try {
        return lp(t), r.invokeTask(i, o, s, a);
      } finally {
        ((t.shouldCoalesceEventChangeDetection && o.type === "eventTask") ||
          t.shouldCoalesceRunChangeDetection) &&
          e(),
          cp(t);
      }
    },
    onInvoke: (r, n, i, o, s, a, l) => {
      try {
        return lp(t), r.invoke(i, o, s, a, l);
      } finally {
        t.shouldCoalesceRunChangeDetection && e(), cp(t);
      }
    },
    onHasTask: (r, n, i, o) => {
      r.hasTask(i, o),
        n === i &&
          (o.change == "microTask"
            ? ((t._hasPendingMicrotasks = o.microTask), tu(t), id(t))
            : o.change == "macroTask" &&
              (t.hasPendingMacrotasks = o.macroTask));
    },
    onHandleError: (r, n, i, o) => (
      r.handleError(i, o), t.runOutsideAngular(() => t.onError.emit(o)), !1
    ),
  });
}
function tu(t) {
  t._hasPendingMicrotasks ||
  ((t.shouldCoalesceEventChangeDetection ||
    t.shouldCoalesceRunChangeDetection) &&
    t.lastRequestAnimationFrameId !== -1)
    ? (t.hasPendingMicrotasks = !0)
    : (t.hasPendingMicrotasks = !1);
}
function lp(t) {
  t._nesting++, t.isStable && ((t.isStable = !1), t.onUnstable.emit(null));
}
function cp(t) {
  t._nesting--, id(t);
}
var nu = class {
  constructor() {
    (this.hasPendingMicrotasks = !1),
      (this.hasPendingMacrotasks = !1),
      (this.isStable = !0),
      (this.onUnstable = new pe()),
      (this.onMicrotaskEmpty = new pe()),
      (this.onStable = new pe()),
      (this.onError = new pe());
  }
  run(e, r, n) {
    return e.apply(r, n);
  }
  runGuarded(e, r, n) {
    return e.apply(r, n);
  }
  runOutsideAngular(e) {
    return e();
  }
  runTask(e, r, n, i) {
    return e.apply(r, n);
  }
};
function oE(t) {
  return !Array.isArray(t) || t.length !== 1
    ? !1
    : t[0].data?.__ignore_ng_zone__ === !0;
}
function sE(t = "zone.js", e) {
  return t === "noop" ? new nu() : t === "zone.js" ? new ie(e) : t;
}
var Lr = (function (t) {
    return (
      (t[(t.EarlyRead = 0)] = "EarlyRead"),
      (t[(t.Write = 1)] = "Write"),
      (t[(t.MixedReadWrite = 2)] = "MixedReadWrite"),
      (t[(t.Read = 3)] = "Read"),
      t
    );
  })(Lr || {}),
  aE = { destroy() {} };
function od(t, e) {
  !e && sw(od);
  let r = e?.injector ?? D(Ot);
  if (!Vb(r)) return aE;
  wa("NgAfterNextRender");
  let n = r.get(sd),
    i = (n.handler ??= new iu()),
    o = e?.phase ?? Lr.MixedReadWrite,
    s = () => {
      i.unregister(l), a();
    },
    a = r.get(Uu).onDestroy(s),
    l = Rt(
      r,
      () =>
        new ru(o, () => {
          s(), t();
        })
    );
  return i.register(l), { destroy: s };
}
var ru = class {
    constructor(e, r) {
      (this.phase = e),
        (this.callbackFn = r),
        (this.zone = D(ie)),
        (this.errorHandler = D(Wt, { optional: !0 })),
        D(js, { optional: !0 })?.notify(1);
    }
    invoke() {
      try {
        this.zone.runOutsideAngular(this.callbackFn);
      } catch (e) {
        this.errorHandler?.handleError(e);
      }
    }
  },
  iu = class {
    constructor() {
      (this.executingCallbacks = !1),
        (this.buckets = {
          [Lr.EarlyRead]: new Set(),
          [Lr.Write]: new Set(),
          [Lr.MixedReadWrite]: new Set(),
          [Lr.Read]: new Set(),
        }),
        (this.deferredCallbacks = new Set());
    }
    register(e) {
      (this.executingCallbacks
        ? this.deferredCallbacks
        : this.buckets[e.phase]
      ).add(e);
    }
    unregister(e) {
      this.buckets[e.phase].delete(e), this.deferredCallbacks.delete(e);
    }
    execute() {
      this.executingCallbacks = !0;
      for (let e of Object.values(this.buckets)) for (let r of e) r.invoke();
      this.executingCallbacks = !1;
      for (let e of this.deferredCallbacks) this.buckets[e.phase].add(e);
      this.deferredCallbacks.clear();
    }
    destroy() {
      for (let e of Object.values(this.buckets)) e.clear();
      this.deferredCallbacks.clear();
    }
  },
  sd = (() => {
    let e = class e {
      constructor() {
        (this.handler = null), (this.internalCallbacks = []);
      }
      execute() {
        this.executeInternalCallbacks(), this.handler?.execute();
      }
      executeInternalCallbacks() {
        let n = [...this.internalCallbacks];
        this.internalCallbacks.length = 0;
        for (let i of n) i();
      }
      ngOnDestroy() {
        this.handler?.destroy(),
          (this.handler = null),
          (this.internalCallbacks.length = 0);
      }
    };
    e.ɵprov = E({ token: e, providedIn: "root", factory: () => new e() });
    let t = e;
    return t;
  })();
function $s(t, e, r) {
  let n = r ? t.styles : null,
    i = r ? t.classes : null,
    o = 0;
  if (e !== null)
    for (let s = 0; s < e.length; s++) {
      let a = e[s];
      if (typeof a == "number") o = a;
      else if (o == 1) i = Rh(i, a);
      else if (o == 2) {
        let l = a,
          c = e[++s];
        n = Rh(n, l + ": " + c + ";");
      }
    }
  r ? (t.styles = n) : (t.stylesWithoutHost = n),
    r ? (t.classes = i) : (t.classesWithoutHost = i);
}
var Us = class extends Da {
  constructor(e) {
    super(), (this.ngModule = e);
  }
  resolveComponentFactory(e) {
    let r = Rn(e);
    return new Gr(r, this.ngModule);
  }
};
function up(t) {
  let e = [];
  for (let r in t) {
    if (!t.hasOwnProperty(r)) continue;
    let n = t[r];
    n !== void 0 &&
      e.push({ propName: Array.isArray(n) ? n[0] : n, templateName: r });
  }
  return e;
}
function lE(t) {
  let e = t.toLowerCase();
  return e === "svg" ? hw : e === "math" ? pw : null;
}
var ou = class {
    constructor(e, r) {
      (this.injector = e), (this.parentInjector = r);
    }
    get(e, r, n) {
      n = Xs(n);
      let i = this.injector.get(e, mc, n);
      return i !== mc || r === mc ? i : this.parentInjector.get(e, r, n);
    }
  },
  Gr = class extends Bs {
    get inputs() {
      let e = this.componentDef,
        r = e.inputTransforms,
        n = up(e.inputs);
      if (r !== null)
        for (let i of n)
          r.hasOwnProperty(i.propName) && (i.transform = r[i.propName]);
      return n;
    }
    get outputs() {
      return up(this.componentDef.outputs);
    }
    constructor(e, r) {
      super(),
        (this.componentDef = e),
        (this.ngModule = r),
        (this.componentType = e.type),
        (this.selector = zD(e.selectors)),
        (this.ngContentSelectors = e.ngContentSelectors
          ? e.ngContentSelectors
          : []),
        (this.isBoundToModule = !!r);
    }
    create(e, r, n, i) {
      let o = W(null);
      try {
        i = i || this.ngModule;
        let s = i instanceof Qe ? i : i?.injector;
        s &&
          this.componentDef.getStandaloneInjector !== null &&
          (s = this.componentDef.getStandaloneInjector(s) || s);
        let a = s ? new ou(e, s) : e,
          l = a.get(Bi, null);
        if (l === null) throw new _(407, !1);
        let c = a.get(eE, null),
          u = a.get(sd, null),
          d = a.get(js, null),
          f = {
            rendererFactory: l,
            sanitizer: c,
            inlineEffectRunner: null,
            afterRenderEventManager: u,
            changeDetectionScheduler: d,
          },
          g = l.createRenderer(null, this.componentDef),
          C = this.componentDef.selectors[0][0] || "div",
          I = n
            ? cC(g, n, this.componentDef.encapsulation, a)
            : Zg(g, C, lE(C)),
          x = 512;
        this.componentDef.signals
          ? (x |= 4096)
          : this.componentDef.onPush || (x |= 16);
        let M = null;
        I !== null && (M = Wu(I, a, !0));
        let ge = Xu(0, null, null, 1, 0, null, null, null, null, null, null),
          Ie = ma(null, ge, null, x, null, null, f, g, a, null, M);
        Vu(Ie);
        let se, Xe;
        try {
          let st = this.componentDef,
            _n,
            Ll = null;
          st.findHostDirectiveDefs
            ? ((_n = []),
              (Ll = new Map()),
              st.findHostDirectiveDefs(st, _n, Ll),
              _n.push(st))
            : (_n = [st]);
          let M0 = cE(Ie, I),
            x0 = uE(M0, I, st, _n, Ie, f, g);
          (Xe = ng(ge, nt)),
            I && hE(g, st, I, n),
            r !== void 0 && pE(Xe, this.ngContentSelectors, r),
            (se = fE(x0, st, _n, Ll, Ie, [gE])),
            nd(ge, Ie, null);
        } finally {
          ju();
        }
        return new su(this.componentType, se, Yr(Xe, Ie), Ie, Xe);
      } finally {
        W(o);
      }
    }
  },
  su = class extends Jc {
    constructor(e, r, n, i, o) {
      super(),
        (this.location = n),
        (this._rootLView = i),
        (this._tNode = o),
        (this.previousInputValues = null),
        (this.instance = r),
        (this.hostView = this.changeDetectorRef = new cr(i, void 0, !1)),
        (this.componentType = e);
    }
    setInput(e, r) {
      let n = this._tNode.inputs,
        i;
      if (n !== null && (i = n[e])) {
        if (
          ((this.previousInputValues ??= new Map()),
          this.previousInputValues.has(e) &&
            Object.is(this.previousInputValues.get(e), r))
        )
          return;
        let o = this._rootLView;
        td(o[L], o, i, e, r), this.previousInputValues.set(e, r);
        let s = Ln(this._tNode.index, o);
        rd(s);
      }
    }
    get injector() {
      return new nr(this._tNode, this._rootLView);
    }
    destroy() {
      this.hostView.destroy();
    }
    onDestroy(e) {
      this.hostView.onDestroy(e);
    }
  };
function cE(t, e) {
  let r = t[L],
    n = nt;
  return (t[n] = e), Kr(r, n, 2, "#host", null);
}
function uE(t, e, r, n, i, o, s) {
  let a = i[L];
  dE(n, t, e, s);
  let l = null;
  e !== null && (l = Wu(e, i[Hr]));
  let c = o.rendererFactory.createRenderer(e, r),
    u = 16;
  r.signals ? (u = 4096) : r.onPush && (u = 64);
  let d = ma(i, um(r), null, u, i[t.index], t, o, c, null, null, l);
  return (
    a.firstCreatePass && Yc(a, t, n.length - 1), ya(i, d), (i[t.index] = d)
  );
}
function dE(t, e, r, n) {
  for (let i of t) e.mergedAttrs = Oi(e.mergedAttrs, i.hostAttrs);
  e.mergedAttrs !== null &&
    ($s(e, e.mergedAttrs, !0), r !== null && im(n, r, e));
}
function fE(t, e, r, n, i, o) {
  let s = Ye(),
    a = i[L],
    l = yt(s, i);
  dm(a, i, s, r, null, n);
  for (let u = 0; u < r.length; u++) {
    let d = s.directiveStart + u,
      f = lr(i, a, d, s);
    kn(f, i);
  }
  fm(a, i, s), l && kn(l, i);
  let c = lr(i, a, s.directiveStart + s.componentOffset, s);
  if (((t[Tt] = i[Tt] = c), o !== null)) for (let u of o) u(c, e);
  return Qu(a, s, i), c;
}
function hE(t, e, r, n) {
  if (n) Sc(t, r, ["ng-version", "17.3.5"]);
  else {
    let { attrs: i, classes: o } = WD(e.selectors[0]);
    i && Sc(t, r, i), o && o.length > 0 && rm(t, r, o.join(" "));
  }
}
function pE(t, e, r) {
  let n = (t.projection = []);
  for (let i = 0; i < e.length; i++) {
    let o = r[i];
    n.push(o != null ? Array.from(o) : null);
  }
}
function gE() {
  let t = Ye();
  ua(U()[L], t);
}
var Zt = (() => {
  let e = class e {};
  e.__NG_ELEMENT_ID__ = mE;
  let t = e;
  return t;
})();
function mE() {
  let t = Ye();
  return _m(t, U());
}
var yE = Zt,
  Im = class extends yE {
    constructor(e, r, n) {
      super(),
        (this._lContainer = e),
        (this._hostTNode = r),
        (this._hostLView = n);
    }
    get element() {
      return Yr(this._hostTNode, this._hostLView);
    }
    get injector() {
      return new nr(this._hostTNode, this._hostLView);
    }
    get parentInjector() {
      let e = Bu(this._hostTNode, this._hostLView);
      if (mg(e)) {
        let r = ks(e, this._hostLView),
          n = Os(e),
          i = r[L].data[n + 8];
        return new nr(i, r);
      } else return new nr(null, this._hostLView);
    }
    clear() {
      for (; this.length > 0; ) this.remove(this.length - 1);
    }
    get(e) {
      let r = dp(this._lContainer);
      return (r !== null && r[e]) || null;
    }
    get length() {
      return this._lContainer.length - at;
    }
    createEmbeddedView(e, r, n) {
      let i, o;
      typeof n == "number"
        ? (i = n)
        : n != null && ((i = n.index), (o = n.injector));
      let s = op(this._lContainer, e.ssrId),
        a = e.createEmbeddedViewImpl(r || {}, o, s);
      return this.insertImpl(a, i, ip(this._hostTNode, s)), a;
    }
    createComponent(e, r, n, i, o) {
      let s = e && !lw(e),
        a;
      if (s) a = r;
      else {
        let C = r || {};
        (a = C.index),
          (n = C.injector),
          (i = C.projectableNodes),
          (o = C.environmentInjector || C.ngModuleRef);
      }
      let l = s ? e : new Gr(Rn(e)),
        c = n || this.parentInjector;
      if (!o && l.ngModule == null) {
        let I = (s ? c : this.parentInjector).get(Qe, null);
        I && (o = I);
      }
      let u = Rn(l.componentType ?? {}),
        d = op(this._lContainer, u?.id ?? null),
        f = d?.firstChild ?? null,
        g = l.create(c, i, f, o);
      return this.insertImpl(g.hostView, a, ip(this._hostTNode, d)), g;
    }
    insert(e, r) {
      return this.insertImpl(e, r, !0);
    }
    insertImpl(e, r, n) {
      let i = e._lView;
      if (vw(i)) {
        let a = this.indexOf(e);
        if (a !== -1) this.detach(a);
        else {
          let l = i[Le],
            c = new Im(l, l[lt], l[Le]);
          c.detach(c.indexOf(e));
        }
      }
      let o = this._adjustIndex(r),
        s = this._lContainer;
      return FC(s, i, o, n), e.attachToViewContainerRef(), Np(yc(s), o, e), e;
    }
    move(e, r) {
      return this.insert(e, r);
    }
    indexOf(e) {
      let r = dp(this._lContainer);
      return r !== null ? r.indexOf(e) : -1;
    }
    remove(e) {
      let r = this._adjustIndex(e, -1),
        n = Zc(this._lContainer, r);
      n && (As(yc(this._lContainer), r), Kg(n[L], n));
    }
    detach(e) {
      let r = this._adjustIndex(e, -1),
        n = Zc(this._lContainer, r);
      return n && As(yc(this._lContainer), r) != null ? new cr(n) : null;
    }
    _adjustIndex(e, r = 0) {
      return e ?? this.length + r;
    }
  };
function dp(t) {
  return t[Rs];
}
function yc(t) {
  return t[Rs] || (t[Rs] = []);
}
function _m(t, e) {
  let r,
    n = e[t.index];
  return (
    gn(n) ? (r = n) : ((r = hm(n, e, null, t)), (e[t.index] = r), ya(e, r)),
    DE(r, e, t, n),
    new Im(r, t, e)
  );
}
function vE(t, e) {
  let r = t[ye],
    n = r.createComment(""),
    i = yt(e, t),
    o = qu(r, i);
  return Ls(r, o, n, Xb(r, i), !1), n;
}
var DE = CE,
  wE = () => !1;
function bE(t, e, r) {
  return wE(t, e, r);
}
function CE(t, e, r, n) {
  if (t[or]) return;
  let i;
  r.type & 8 ? (i = zt(n)) : (i = vE(e, r)), (t[or] = i);
}
var au = class t {
    constructor(e) {
      (this.queryList = e), (this.matches = null);
    }
    clone() {
      return new t(this.queryList);
    }
    setDirty() {
      this.queryList.setDirty();
    }
  },
  lu = class t {
    constructor(e = []) {
      this.queries = e;
    }
    createEmbeddedView(e) {
      let r = e.queries;
      if (r !== null) {
        let n = e.contentQueries !== null ? e.contentQueries[0] : r.length,
          i = [];
        for (let o = 0; o < n; o++) {
          let s = r.getByIndex(o),
            a = this.queries[s.indexInDeclarationView];
          i.push(a.clone());
        }
        return new t(i);
      }
      return null;
    }
    insertView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    detachView(e) {
      this.dirtyQueriesWithMatches(e);
    }
    finishViewCreation(e) {
      this.dirtyQueriesWithMatches(e);
    }
    dirtyQueriesWithMatches(e) {
      for (let r = 0; r < this.queries.length; r++)
        ad(e, r).matches !== null && this.queries[r].setDirty();
    }
  },
  cu = class {
    constructor(e, r, n = null) {
      (this.flags = r),
        (this.read = n),
        typeof e == "string" ? (this.predicate = AE(e)) : (this.predicate = e);
    }
  },
  uu = class t {
    constructor(e = []) {
      this.queries = e;
    }
    elementStart(e, r) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].elementStart(e, r);
    }
    elementEnd(e) {
      for (let r = 0; r < this.queries.length; r++)
        this.queries[r].elementEnd(e);
    }
    embeddedTView(e) {
      let r = null;
      for (let n = 0; n < this.length; n++) {
        let i = r !== null ? r.length : 0,
          o = this.getByIndex(n).embeddedTView(e, i);
        o &&
          ((o.indexInDeclarationView = n), r !== null ? r.push(o) : (r = [o]));
      }
      return r !== null ? new t(r) : null;
    }
    template(e, r) {
      for (let n = 0; n < this.queries.length; n++)
        this.queries[n].template(e, r);
    }
    getByIndex(e) {
      return this.queries[e];
    }
    get length() {
      return this.queries.length;
    }
    track(e) {
      this.queries.push(e);
    }
  },
  du = class t {
    constructor(e, r = -1) {
      (this.metadata = e),
        (this.matches = null),
        (this.indexInDeclarationView = -1),
        (this.crossesNgTemplate = !1),
        (this._appliesToNextNode = !0),
        (this._declarationNodeIndex = r);
    }
    elementStart(e, r) {
      this.isApplyingToNode(r) && this.matchTNode(e, r);
    }
    elementEnd(e) {
      this._declarationNodeIndex === e.index && (this._appliesToNextNode = !1);
    }
    template(e, r) {
      this.elementStart(e, r);
    }
    embeddedTView(e, r) {
      return this.isApplyingToNode(e)
        ? ((this.crossesNgTemplate = !0),
          this.addMatch(-e.index, r),
          new t(this.metadata))
        : null;
    }
    isApplyingToNode(e) {
      if (this._appliesToNextNode && (this.metadata.flags & 1) !== 1) {
        let r = this._declarationNodeIndex,
          n = e.parent;
        for (; n !== null && n.type & 8 && n.index !== r; ) n = n.parent;
        return r === (n !== null ? n.index : -1);
      }
      return this._appliesToNextNode;
    }
    matchTNode(e, r) {
      let n = this.metadata.predicate;
      if (Array.isArray(n))
        for (let i = 0; i < n.length; i++) {
          let o = n[i];
          this.matchTNodeWithReadOption(e, r, EE(r, o)),
            this.matchTNodeWithReadOption(e, r, _s(r, e, o, !1, !1));
        }
      else
        n === ur
          ? r.type & 4 && this.matchTNodeWithReadOption(e, r, -1)
          : this.matchTNodeWithReadOption(e, r, _s(r, e, n, !1, !1));
    }
    matchTNodeWithReadOption(e, r, n) {
      if (n !== null) {
        let i = this.metadata.read;
        if (i !== null)
          if (i === $e || i === Zt || (i === ur && r.type & 4))
            this.addMatch(r.index, -2);
          else {
            let o = _s(r, e, i, !1, !1);
            o !== null && this.addMatch(r.index, o);
          }
        else this.addMatch(r.index, n);
      }
    }
    addMatch(e, r) {
      this.matches === null ? (this.matches = [e, r]) : this.matches.push(e, r);
    }
  };
function EE(t, e) {
  let r = t.localNames;
  if (r !== null) {
    for (let n = 0; n < r.length; n += 2) if (r[n] === e) return r[n + 1];
  }
  return null;
}
function IE(t, e) {
  return t.type & 11 ? Yr(t, e) : t.type & 4 ? va(t, e) : null;
}
function _E(t, e, r, n) {
  return r === -1 ? IE(e, t) : r === -2 ? SE(t, e, n) : lr(t, t[L], r, e);
}
function SE(t, e, r) {
  if (r === $e) return Yr(e, t);
  if (r === ur) return va(e, t);
  if (r === Zt) return _m(e, t);
}
function Sm(t, e, r, n) {
  let i = e[un].queries[n];
  if (i.matches === null) {
    let o = t.data,
      s = r.matches,
      a = [];
    for (let l = 0; s !== null && l < s.length; l += 2) {
      let c = s[l];
      if (c < 0) a.push(null);
      else {
        let u = o[c];
        a.push(_E(e, u, s[l + 1], r.metadata.read));
      }
    }
    i.matches = a;
  }
  return i.matches;
}
function fu(t, e, r, n) {
  let i = t.queries.getByIndex(r),
    o = i.matches;
  if (o !== null) {
    let s = Sm(t, e, i, r);
    for (let a = 0; a < o.length; a += 2) {
      let l = o[a];
      if (l > 0) n.push(s[a / 2]);
      else {
        let c = o[a + 1],
          u = e[-l];
        for (let d = at; d < u.length; d++) {
          let f = u[d];
          f[Wi] === f[Le] && fu(f[L], f, c, n);
        }
        if (u[zr] !== null) {
          let d = u[zr];
          for (let f = 0; f < d.length; f++) {
            let g = d[f];
            fu(g[L], g, c, n);
          }
        }
      }
    }
  }
  return n;
}
function ME(t, e) {
  return t[un].queries[e].queryList;
}
function xE(t, e, r) {
  let n = new Vc((r & 4) === 4);
  return (
    fC(t, e, n, n.destroy), (e[un] ??= new lu()).queries.push(new au(n)) - 1
  );
}
function TE(t, e, r) {
  let n = Se();
  return (
    n.firstCreatePass &&
      (NE(n, new cu(t, e, r), -1), (e & 2) === 2 && (n.staticViewQueries = !0)),
    xE(n, U(), e)
  );
}
function AE(t) {
  return t.split(",").map((e) => e.trim());
}
function NE(t, e, r) {
  t.queries === null && (t.queries = new uu()), t.queries.track(new du(e, r));
}
function ad(t, e) {
  return t.queries.getByIndex(e);
}
function RE(t, e) {
  let r = t[L],
    n = ad(r, e);
  return n.crossesNgTemplate ? fu(r, t, e, []) : Sm(r, t, n, e);
}
function OE(t) {
  return typeof t == "function" && t[jl] !== void 0;
}
function Mm(t) {
  return OE(t) && typeof t.set == "function";
}
function kE(t) {
  let e = [],
    r = new Map();
  function n(i) {
    let o = r.get(i);
    if (!o) {
      let s = t(i);
      r.set(i, (o = s.then(VE)));
    }
    return o;
  }
  return (
    Hs.forEach((i, o) => {
      let s = [];
      i.templateUrl &&
        s.push(
          n(i.templateUrl).then((c) => {
            i.template = c;
          })
        );
      let a = typeof i.styles == "string" ? [i.styles] : i.styles || [];
      if (((i.styles = a), i.styleUrl && i.styleUrls?.length))
        throw new Error(
          "@Component cannot define both `styleUrl` and `styleUrls`. Use `styleUrl` if the component has one stylesheet, or `styleUrls` if it has multiple"
        );
      if (i.styleUrls?.length) {
        let c = i.styles.length,
          u = i.styleUrls;
        i.styleUrls.forEach((d, f) => {
          a.push(""),
            s.push(
              n(d).then((g) => {
                (a[c + f] = g),
                  u.splice(u.indexOf(d), 1),
                  u.length == 0 && (i.styleUrls = void 0);
              })
            );
        });
      } else
        i.styleUrl &&
          s.push(
            n(i.styleUrl).then((c) => {
              a.push(c), (i.styleUrl = void 0);
            })
          );
      let l = Promise.all(s).then(() => jE(o));
      e.push(l);
    }),
    FE(),
    Promise.all(e).then(() => {})
  );
}
var Hs = new Map(),
  PE = new Set();
function FE() {
  let t = Hs;
  return (Hs = new Map()), t;
}
function LE() {
  return Hs.size === 0;
}
function VE(t) {
  return typeof t == "string" ? t : t.text();
}
function jE(t) {
  PE.delete(t);
}
function BE(t) {
  return Object.getPrototypeOf(t.prototype).constructor;
}
function Pt(t) {
  let e = BE(t.type),
    r = !0,
    n = [t];
  for (; e; ) {
    let i;
    if (On(t)) i = e.ɵcmp || e.ɵdir;
    else {
      if (e.ɵcmp) throw new _(903, !1);
      i = e.ɵdir;
    }
    if (i) {
      if (r) {
        n.push(i);
        let s = t;
        (s.inputs = Ds(t.inputs)),
          (s.inputTransforms = Ds(t.inputTransforms)),
          (s.declaredInputs = Ds(t.declaredInputs)),
          (s.outputs = Ds(t.outputs));
        let a = i.hostBindings;
        a && WE(t, a);
        let l = i.viewQuery,
          c = i.contentQueries;
        if (
          (l && HE(t, l),
          c && zE(t, c),
          $E(t, i),
          lD(t.outputs, i.outputs),
          On(i) && i.data.animation)
        ) {
          let u = t.data;
          u.animation = (u.animation || []).concat(i.data.animation);
        }
      }
      let o = i.features;
      if (o)
        for (let s = 0; s < o.length; s++) {
          let a = o[s];
          a && a.ngInherit && a(t), a === Pt && (r = !1);
        }
    }
    e = Object.getPrototypeOf(e);
  }
  UE(n);
}
function $E(t, e) {
  for (let r in e.inputs) {
    if (!e.inputs.hasOwnProperty(r) || t.inputs.hasOwnProperty(r)) continue;
    let n = e.inputs[r];
    if (
      n !== void 0 &&
      ((t.inputs[r] = n),
      (t.declaredInputs[r] = e.declaredInputs[r]),
      e.inputTransforms !== null)
    ) {
      let i = Array.isArray(n) ? n[0] : n;
      if (!e.inputTransforms.hasOwnProperty(i)) continue;
      (t.inputTransforms ??= {}), (t.inputTransforms[i] = e.inputTransforms[i]);
    }
  }
}
function UE(t) {
  let e = 0,
    r = null;
  for (let n = t.length - 1; n >= 0; n--) {
    let i = t[n];
    (i.hostVars = e += i.hostVars),
      (i.hostAttrs = Oi(i.hostAttrs, (r = Oi(r, i.hostAttrs))));
  }
}
function Ds(t) {
  return t === Br ? {} : t === mt ? [] : t;
}
function HE(t, e) {
  let r = t.viewQuery;
  r
    ? (t.viewQuery = (n, i) => {
        e(n, i), r(n, i);
      })
    : (t.viewQuery = e);
}
function zE(t, e) {
  let r = t.contentQueries;
  r
    ? (t.contentQueries = (n, i, o) => {
        e(n, i, o), r(n, i, o);
      })
    : (t.contentQueries = e);
}
function WE(t, e) {
  let r = t.hostBindings;
  r
    ? (t.hostBindings = (n, i) => {
        e(n, i), r(n, i);
      })
    : (t.hostBindings = e);
}
function ld(t) {
  let e = t.inputConfig,
    r = {};
  for (let n in e)
    if (e.hasOwnProperty(n)) {
      let i = e[n];
      Array.isArray(i) && i[3] && (r[n] = i[3]);
    }
  t.inputTransforms = r;
}
var Pn = class {},
  $i = class {};
var zs = class extends Pn {
    constructor(e, r, n) {
      super(),
        (this._parent = r),
        (this._bootstrapComponents = []),
        (this.destroyCbs = []),
        (this.componentFactoryResolver = new Us(this));
      let i = $p(e);
      (this._bootstrapComponents = qg(i.bootstrap)),
        (this._r3Injector = _g(
          e,
          r,
          [
            { provide: Pn, useValue: this },
            { provide: Da, useValue: this.componentFactoryResolver },
            ...n,
          ],
          Ze(e),
          new Set(["environment"])
        )),
        this._r3Injector.resolveInjectorInitializers(),
        (this.instance = this._r3Injector.get(e));
    }
    get injector() {
      return this._r3Injector;
    }
    destroy() {
      let e = this._r3Injector;
      !e.destroyed && e.destroy(),
        this.destroyCbs.forEach((r) => r()),
        (this.destroyCbs = null);
    }
    onDestroy(e) {
      this.destroyCbs.push(e);
    }
  },
  Ws = class extends $i {
    constructor(e) {
      super(), (this.moduleType = e);
    }
    create(e) {
      return new zs(this.moduleType, e, []);
    }
  };
function GE(t, e, r) {
  return new zs(t, e, r);
}
var hu = class extends Pn {
  constructor(e) {
    super(),
      (this.componentFactoryResolver = new Us(this)),
      (this.instance = null);
    let r = new ki(
      [
        ...e.providers,
        { provide: Pn, useValue: this },
        { provide: Da, useValue: this.componentFactoryResolver },
      ],
      e.parent || Tu(),
      e.debugName,
      new Set(["environment"])
    );
    (this.injector = r),
      e.runEnvironmentInitializers && r.resolveInjectorInitializers();
  }
  destroy() {
    this.injector.destroy();
  }
  onDestroy(e) {
    this.injector.onDestroy(e);
  }
};
function ba(t, e, r = null) {
  return new hu({
    providers: t,
    parent: e,
    debugName: r,
    runEnvironmentInitializers: !0,
  }).injector;
}
var hr = (() => {
  let e = class e {
    constructor() {
      (this.taskId = 0),
        (this.pendingTasks = new Set()),
        (this.hasPendingTasks = new we(!1));
    }
    get _hasPendingTasks() {
      return this.hasPendingTasks.value;
    }
    add() {
      this._hasPendingTasks || this.hasPendingTasks.next(!0);
      let n = this.taskId++;
      return this.pendingTasks.add(n), n;
    }
    remove(n) {
      this.pendingTasks.delete(n),
        this.pendingTasks.size === 0 &&
          this._hasPendingTasks &&
          this.hasPendingTasks.next(!1);
    }
    ngOnDestroy() {
      this.pendingTasks.clear(),
        this._hasPendingTasks && this.hasPendingTasks.next(!1);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function xm(t) {
  return ZE(t)
    ? Array.isArray(t) || (!(t instanceof Map) && Symbol.iterator in t)
    : !1;
}
function qE(t, e) {
  if (Array.isArray(t)) for (let r = 0; r < t.length; r++) e(t[r]);
  else {
    let r = t[Symbol.iterator](),
      n;
    for (; !(n = r.next()).done; ) e(n.value);
  }
}
function ZE(t) {
  return t !== null && (typeof t == "function" || typeof t == "object");
}
function cd(t, e, r) {
  return (t[e] = r);
}
function QE(t, e) {
  return t[e];
}
function Fn(t, e, r) {
  let n = t[e];
  return Object.is(n, r) ? !1 : ((t[e] = r), !0);
}
function YE(t, e, r, n) {
  let i = Fn(t, e, r);
  return Fn(t, e + 1, n) || i;
}
function KE(t) {
  return (t.flags & 32) === 32;
}
function XE(t, e, r, n, i, o, s, a, l) {
  let c = e.consts,
    u = Kr(e, t, 4, s || null, Wr(c, a));
  ed(e, r, u, Wr(c, l)), ua(e, u);
  let d = (u.tView = Xu(
    2,
    u,
    n,
    i,
    o,
    e.directiveRegistry,
    e.pipeRegistry,
    null,
    e.schemas,
    c,
    null
  ));
  return (
    e.queries !== null &&
      (e.queries.template(e, u), (d.queries = e.queries.embeddedTView(u))),
    u
  );
}
function G(t, e, r, n, i, o, s, a) {
  let l = U(),
    c = Se(),
    u = t + nt,
    d = c.firstCreatePass ? XE(u, c, l, e, r, n, i, o, s) : c.data[u];
  fr(d, !1);
  let f = JE(c, l, d, t);
  la() && pa(c, l, f, d), kn(f, l);
  let g = hm(f, l, f, d);
  return (
    (l[u] = g),
    ya(l, g),
    bE(g, d, l),
    oa(d) && Yu(c, l, d),
    s != null && Ku(l, d, a),
    G
  );
}
var JE = eI;
function eI(t, e, r, n) {
  return ca(!0), e[ye].createComment("");
}
function Ca(t, e, r, n) {
  let i = U(),
    o = sa();
  if (Fn(i, o, e)) {
    let s = Se(),
      a = aa();
    MC(a, i, t, e, r, n);
  }
  return Ca;
}
function Tm(t, e, r, n) {
  return Fn(t, sa(), r) ? e + Ks(r) + n : vn;
}
function ws(t, e) {
  return (t << 17) | (e << 2);
}
function dr(t) {
  return (t >> 17) & 32767;
}
function tI(t) {
  return (t & 2) == 2;
}
function nI(t, e) {
  return (t & 131071) | (e << 17);
}
function pu(t) {
  return t | 2;
}
function qr(t) {
  return (t & 131068) >> 2;
}
function vc(t, e) {
  return (t & -131069) | (e << 2);
}
function rI(t) {
  return (t & 1) === 1;
}
function gu(t) {
  return t | 1;
}
function iI(t, e, r, n, i, o) {
  let s = o ? e.classBindings : e.styleBindings,
    a = dr(s),
    l = qr(s);
  t[n] = r;
  let c = !1,
    u;
  if (Array.isArray(r)) {
    let d = r;
    (u = d[1]), (u === null || zi(d, u) > 0) && (c = !0);
  } else u = r;
  if (i)
    if (l !== 0) {
      let f = dr(t[a + 1]);
      (t[n + 1] = ws(f, a)),
        f !== 0 && (t[f + 1] = vc(t[f + 1], n)),
        (t[a + 1] = nI(t[a + 1], n));
    } else
      (t[n + 1] = ws(a, 0)), a !== 0 && (t[a + 1] = vc(t[a + 1], n)), (a = n);
  else
    (t[n + 1] = ws(l, 0)),
      a === 0 ? (a = n) : (t[l + 1] = vc(t[l + 1], n)),
      (l = n);
  c && (t[n + 1] = pu(t[n + 1])),
    fp(t, u, n, !0),
    fp(t, u, n, !1),
    oI(e, u, t, n, o),
    (s = ws(a, l)),
    o ? (e.classBindings = s) : (e.styleBindings = s);
}
function oI(t, e, r, n, i) {
  let o = i ? t.residualClasses : t.residualStyles;
  o != null &&
    typeof e == "string" &&
    zi(o, e) >= 0 &&
    (r[n + 1] = gu(r[n + 1]));
}
function fp(t, e, r, n) {
  let i = t[r + 1],
    o = e === null,
    s = n ? dr(i) : qr(i),
    a = !1;
  for (; s !== 0 && (a === !1 || o); ) {
    let l = t[s],
      c = t[s + 1];
    sI(l, e) && ((a = !0), (t[s + 1] = n ? gu(c) : pu(c))),
      (s = n ? dr(c) : qr(c));
  }
  a && (t[r + 1] = n ? pu(i) : gu(i));
}
function sI(t, e) {
  return t === null || e == null || (Array.isArray(t) ? t[1] : t) === e
    ? !0
    : Array.isArray(t) && typeof e == "string"
    ? zi(t, e) >= 0
    : !1;
}
function T(t, e, r) {
  let n = U(),
    i = sa();
  if (Fn(n, i, e)) {
    let o = Se(),
      s = aa();
    Ju(o, s, n, t, e, n[ye], r, !1);
  }
  return T;
}
function hp(t, e, r, n, i) {
  let o = e.inputs,
    s = i ? "class" : "style";
  td(t, r, o[s], s, n);
}
function Xr(t, e) {
  return aI(t, e, null, !0), Xr;
}
function aI(t, e, r, n) {
  let i = U(),
    o = Se(),
    s = Aw(2);
  if ((o.firstUpdatePass && cI(o, t, s, n), e !== vn && Fn(i, s, e))) {
    let a = o.data[Qr()];
    pI(o, a, i, i[ye], t, (i[s + 1] = gI(e, r)), n, s);
  }
}
function lI(t, e) {
  return e >= t.expandoStartIndex;
}
function cI(t, e, r, n) {
  let i = t.data;
  if (i[r + 1] === null) {
    let o = i[Qr()],
      s = lI(t, r);
    mI(o, n) && e === null && !s && (e = !1),
      (e = uI(i, o, e, n)),
      iI(i, o, e, r, s, n);
  }
}
function uI(t, e, r, n) {
  let i = kw(t),
    o = n ? e.residualClasses : e.residualStyles;
  if (i === null)
    (n ? e.classBindings : e.styleBindings) === 0 &&
      ((r = Dc(null, t, e, r, n)), (r = Ui(r, e.attrs, n)), (o = null));
  else {
    let s = e.directiveStylingLast;
    if (s === -1 || t[s] !== i)
      if (((r = Dc(i, t, e, r, n)), o === null)) {
        let l = dI(t, e, n);
        l !== void 0 &&
          Array.isArray(l) &&
          ((l = Dc(null, t, e, l[1], n)),
          (l = Ui(l, e.attrs, n)),
          fI(t, e, n, l));
      } else o = hI(t, e, n);
  }
  return (
    o !== void 0 && (n ? (e.residualClasses = o) : (e.residualStyles = o)), r
  );
}
function dI(t, e, r) {
  let n = r ? e.classBindings : e.styleBindings;
  if (qr(n) !== 0) return t[dr(n)];
}
function fI(t, e, r, n) {
  let i = r ? e.classBindings : e.styleBindings;
  t[dr(i)] = n;
}
function hI(t, e, r) {
  let n,
    i = e.directiveEnd;
  for (let o = 1 + e.directiveStylingLast; o < i; o++) {
    let s = t[o].hostAttrs;
    n = Ui(n, s, r);
  }
  return Ui(n, e.attrs, r);
}
function Dc(t, e, r, n, i) {
  let o = null,
    s = r.directiveEnd,
    a = r.directiveStylingLast;
  for (
    a === -1 ? (a = r.directiveStart) : a++;
    a < s && ((o = e[a]), (n = Ui(n, o.hostAttrs, i)), o !== t);

  )
    a++;
  return t !== null && (r.directiveStylingLast = a), n;
}
function Ui(t, e, r) {
  let n = r ? 1 : 2,
    i = -1;
  if (e !== null)
    for (let o = 0; o < e.length; o++) {
      let s = e[o];
      typeof s == "number"
        ? (i = s)
        : i === n &&
          (Array.isArray(t) || (t = t === void 0 ? [] : ["", t]),
          ND(t, s, r ? !0 : e[++o]));
    }
  return t === void 0 ? null : t;
}
function pI(t, e, r, n, i, o, s, a) {
  if (!(e.type & 3)) return;
  let l = t.data,
    c = l[a + 1],
    u = rI(c) ? pp(l, e, r, i, qr(c), s) : void 0;
  if (!Gs(u)) {
    Gs(o) || (tI(c) && (o = pp(l, null, r, i, a, s)));
    let d = tg(Qr(), r);
    iC(n, s, d, i, o);
  }
}
function pp(t, e, r, n, i, o) {
  let s = e === null,
    a;
  for (; i > 0; ) {
    let l = t[i],
      c = Array.isArray(l),
      u = c ? l[1] : l,
      d = u === null,
      f = r[i + 1];
    f === vn && (f = d ? mt : void 0);
    let g = d ? lc(f, n) : u === n ? f : void 0;
    if ((c && !Gs(g) && (g = lc(l, n)), Gs(g) && ((a = g), s))) return a;
    let C = t[i + 1];
    i = s ? dr(C) : qr(C);
  }
  if (e !== null) {
    let l = o ? e.residualClasses : e.residualStyles;
    l != null && (a = lc(l, n));
  }
  return a;
}
function Gs(t) {
  return t !== void 0;
}
function gI(t, e) {
  return (
    t == null ||
      t === "" ||
      (typeof e == "string"
        ? (t = t + e)
        : typeof t == "object" && (t = Ze(Gt(t)))),
    t
  );
}
function mI(t, e) {
  return (t.flags & (e ? 8 : 16)) !== 0;
}
function yI(t, e, r, n, i, o) {
  let s = e.consts,
    a = Wr(s, i),
    l = Kr(e, t, 2, n, a);
  return (
    ed(e, r, l, Wr(s, o)),
    l.attrs !== null && $s(l, l.attrs, !1),
    l.mergedAttrs !== null && $s(l, l.mergedAttrs, !0),
    e.queries !== null && e.queries.elementStart(e, l),
    l
  );
}
function p(t, e, r, n) {
  let i = U(),
    o = Se(),
    s = nt + t,
    a = i[ye],
    l = o.firstCreatePass ? yI(s, o, i, e, r, n) : o.data[s],
    c = vI(o, i, l, a, e, t);
  i[s] = c;
  let u = oa(l);
  return (
    fr(l, !0),
    im(a, c, l),
    !KE(l) && la() && pa(o, i, c, l),
    Cw() === 0 && kn(c, i),
    Ew(),
    u && (Yu(o, i, l), Qu(o, l, i)),
    n !== null && Ku(i, l),
    p
  );
}
function h() {
  let t = Ye();
  Pu() ? Fu() : ((t = t.parent), fr(t, !1));
  let e = t;
  _w(e) && Sw(), Iw();
  let r = Se();
  return (
    r.firstCreatePass && (ua(r, t), Nu(t) && r.queries.elementEnd(t)),
    e.classesWithoutHost != null &&
      $w(e) &&
      hp(r, e, U(), e.classesWithoutHost, !0),
    e.stylesWithoutHost != null &&
      Uw(e) &&
      hp(r, e, U(), e.stylesWithoutHost, !1),
    h
  );
}
function ne(t, e, r, n) {
  return p(t, e, r, n), h(), ne;
}
var vI = (t, e, r, n, i, o) => (ca(!0), Zg(n, i, Lw()));
function DI(t, e, r, n, i) {
  let o = e.consts,
    s = Wr(o, n),
    a = Kr(e, t, 8, "ng-container", s);
  s !== null && $s(a, s, !0);
  let l = Wr(o, i);
  return ed(e, r, a, l), e.queries !== null && e.queries.elementStart(e, a), a;
}
function Ue(t, e, r) {
  let n = U(),
    i = Se(),
    o = t + nt,
    s = i.firstCreatePass ? DI(o, i, n, e, r) : i.data[o];
  fr(s, !0);
  let a = wI(i, n, s, t);
  return (
    (n[o] = a),
    la() && pa(i, n, a, s),
    kn(a, n),
    oa(s) && (Yu(i, n, s), Qu(i, s, n)),
    r != null && Ku(n, s),
    Ue
  );
}
function He() {
  let t = Ye(),
    e = Se();
  return (
    Pu() ? Fu() : ((t = t.parent), fr(t, !1)),
    e.firstCreatePass && (ua(e, t), Nu(t) && e.queries.elementEnd(t)),
    He
  );
}
var wI = (t, e, r, n) => (ca(!0), Ub(e[ye], ""));
function Ve() {
  return U();
}
var er = void 0;
function bI(t) {
  let e = t,
    r = Math.floor(Math.abs(t)),
    n = t.toString().replace(/^[^.]*\.?/, "").length;
  return r === 1 && n === 0 ? 1 : 5;
}
var CI = [
    "en",
    [["a", "p"], ["AM", "PM"], er],
    [["AM", "PM"], er, er],
    [
      ["S", "M", "T", "W", "T", "F", "S"],
      ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    ],
    er,
    [
      ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
      [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    ],
    er,
    [
      ["B", "A"],
      ["BC", "AD"],
      ["Before Christ", "Anno Domini"],
    ],
    0,
    [6, 0],
    ["M/d/yy", "MMM d, y", "MMMM d, y", "EEEE, MMMM d, y"],
    ["h:mm a", "h:mm:ss a", "h:mm:ss a z", "h:mm:ss a zzzz"],
    ["{1}, {0}", er, "{1} 'at' {0}", er],
    [".", ",", ";", "%", "+", "-", "E", "\xD7", "\u2030", "\u221E", "NaN", ":"],
    ["#,##0.###", "#,##0%", "\xA4#,##0.00", "#E0"],
    "USD",
    "$",
    "US Dollar",
    {},
    "ltr",
    bI,
  ],
  wc = {};
function Dt(t) {
  let e = EI(t),
    r = gp(e);
  if (r) return r;
  let n = e.split("-")[0];
  if (((r = gp(n)), r)) return r;
  if (n === "en") return CI;
  throw new _(701, !1);
}
function gp(t) {
  return (
    t in wc ||
      (wc[t] =
        be.ng &&
        be.ng.common &&
        be.ng.common.locales &&
        be.ng.common.locales[t]),
    wc[t]
  );
}
var Ee = (function (t) {
  return (
    (t[(t.LocaleId = 0)] = "LocaleId"),
    (t[(t.DayPeriodsFormat = 1)] = "DayPeriodsFormat"),
    (t[(t.DayPeriodsStandalone = 2)] = "DayPeriodsStandalone"),
    (t[(t.DaysFormat = 3)] = "DaysFormat"),
    (t[(t.DaysStandalone = 4)] = "DaysStandalone"),
    (t[(t.MonthsFormat = 5)] = "MonthsFormat"),
    (t[(t.MonthsStandalone = 6)] = "MonthsStandalone"),
    (t[(t.Eras = 7)] = "Eras"),
    (t[(t.FirstDayOfWeek = 8)] = "FirstDayOfWeek"),
    (t[(t.WeekendRange = 9)] = "WeekendRange"),
    (t[(t.DateFormat = 10)] = "DateFormat"),
    (t[(t.TimeFormat = 11)] = "TimeFormat"),
    (t[(t.DateTimeFormat = 12)] = "DateTimeFormat"),
    (t[(t.NumberSymbols = 13)] = "NumberSymbols"),
    (t[(t.NumberFormats = 14)] = "NumberFormats"),
    (t[(t.CurrencyCode = 15)] = "CurrencyCode"),
    (t[(t.CurrencySymbol = 16)] = "CurrencySymbol"),
    (t[(t.CurrencyName = 17)] = "CurrencyName"),
    (t[(t.Currencies = 18)] = "Currencies"),
    (t[(t.Directionality = 19)] = "Directionality"),
    (t[(t.PluralCase = 20)] = "PluralCase"),
    (t[(t.ExtraData = 21)] = "ExtraData"),
    t
  );
})(Ee || {});
function EI(t) {
  return t.toLowerCase().replace(/_/g, "-");
}
var qs = "en-US";
var II = qs;
function _I(t) {
  typeof t == "string" && (II = t.toLowerCase().replace(/_/g, "-"));
}
function z(t, e, r, n) {
  let i = U(),
    o = Se(),
    s = Ye();
  return Am(o, i, i[ye], s, t, e, n), z;
}
function SI(t, e, r, n) {
  let i = t.cleanup;
  if (i != null)
    for (let o = 0; o < i.length - 1; o += 2) {
      let s = i[o];
      if (s === r && i[o + 1] === n) {
        let a = e[Fi],
          l = i[o + 2];
        return a.length > l ? a[l] : null;
      }
      typeof s == "string" && (o += 2);
    }
  return null;
}
function Am(t, e, r, n, i, o, s) {
  let a = oa(n),
    c = t.firstCreatePass && mm(t),
    u = e[Tt],
    d = gm(e),
    f = !0;
  if (n.type & 3 || s) {
    let I = yt(n, e),
      x = s ? s(I) : I,
      M = d.length,
      ge = s ? (se) => s(zt(se[n.index])) : n.index,
      Ie = null;
    if ((!s && a && (Ie = SI(t, e, i, n.index)), Ie !== null)) {
      let se = Ie.__ngLastListenerFn__ || Ie;
      (se.__ngNextListenerFn__ = o), (Ie.__ngLastListenerFn__ = o), (f = !1);
    } else {
      o = yp(n, e, u, o, !1);
      let se = r.listen(x, i, o);
      d.push(o, se), c && c.push(i, ge, M, M + 1);
    }
  } else o = yp(n, e, u, o, !1);
  let g = n.outputs,
    C;
  if (f && g !== null && (C = g[i])) {
    let I = C.length;
    if (I)
      for (let x = 0; x < I; x += 2) {
        let M = C[x],
          ge = C[x + 1],
          Xe = e[M][ge].subscribe(o),
          st = d.length;
        d.push(o, Xe), c && c.push(i, n.index, st, -(st + 1));
      }
  }
}
function mp(t, e, r, n) {
  let i = W(null);
  try {
    return $t(6, e, r), r(n) !== !1;
  } catch (o) {
    return ym(t, o), !1;
  } finally {
    $t(7, e, r), W(i);
  }
}
function yp(t, e, r, n, i) {
  return function o(s) {
    if (s === Function) return n;
    let a = t.componentOffset > -1 ? Ln(t.index, e) : e;
    rd(a);
    let l = mp(e, r, n, s),
      c = o.__ngNextListenerFn__;
    for (; c; ) (l = mp(e, r, c, s) && l), (c = c.__ngNextListenerFn__);
    return i && l === !1 && s.preventDefault(), l;
  };
}
function ce(t = 1) {
  return Fw(t);
}
function MI(t, e) {
  let r = null,
    n = jD(t);
  for (let i = 0; i < e.length; i++) {
    let o = e[i];
    if (o === "*") {
      r = i;
      continue;
    }
    if (n === null ? Lp(t, o, !0) : UD(n, o)) return i;
  }
  return r;
}
function Nm(t) {
  let e = U()[Nt][lt];
  if (!e.projection) {
    let r = t ? t.length : 1,
      n = (e.projection = TD(r, null)),
      i = n.slice(),
      o = e.child;
    for (; o !== null; ) {
      let s = t ? MI(o, t) : 0;
      s !== null && (i[s] ? (i[s].projectionNext = o) : (n[s] = o), (i[s] = o)),
        (o = o.next);
    }
  }
}
function Rm(t, e = 0, r) {
  let n = U(),
    i = Se(),
    o = Kr(i, nt + t, 16, null, r || null);
  o.projection === null && (o.projection = e),
    Fu(),
    (!n[Pi] || sg()) && (o.flags & 32) !== 32 && nC(i, n, o);
}
function Zi(t, e, r) {
  return Om(t, "", e, "", r), Zi;
}
function Om(t, e, r, n, i) {
  let o = U(),
    s = Tm(o, e, r, n);
  if (s !== vn) {
    let a = Se(),
      l = aa();
    Ju(a, l, o, t, s, o[ye], i, !1);
  }
  return Om;
}
function km(t, e, r) {
  TE(t, e, r);
}
function ud(t) {
  let e = U(),
    r = Se(),
    n = lg();
  Lu(n + 1);
  let i = ad(r, n);
  if (t.dirty && yw(e) === ((i.metadata.flags & 2) === 2)) {
    if (i.matches === null) t.reset([]);
    else {
      let o = RE(e, n);
      t.reset(o, tb), t.notifyOnChanges();
    }
    return !0;
  }
  return !1;
}
function dd() {
  return ME(U(), lg());
}
function xI(t, e, r, n) {
  r >= t.data.length && ((t.data[r] = null), (t.blueprint[r] = null)),
    (e[r] = n);
}
function Ea(t) {
  let e = xw();
  return Ru(e, nt + t);
}
function m(t, e = "") {
  let r = U(),
    n = Se(),
    i = t + nt,
    o = n.firstCreatePass ? Kr(n, i, 1, e, null) : n.data[i],
    s = TI(n, r, o, e, t);
  (r[i] = s), la() && pa(n, r, s, o), fr(o, !1);
}
var TI = (t, e, r, n, i) => (ca(!0), Bb(e[ye], n));
function re(t) {
  return Qt("", t, ""), re;
}
function Qt(t, e, r) {
  let n = U(),
    i = Tm(n, t, e, r);
  return i !== vn && NC(n, Qr(), i), Qt;
}
function Q(t, e, r) {
  Mm(e) && (e = e());
  let n = U(),
    i = sa();
  if (Fn(n, i, e)) {
    let o = Se(),
      s = aa();
    Ju(o, s, n, t, e, n[ye], r, !1);
  }
  return Q;
}
function J(t, e) {
  let r = Mm(t);
  return r && t.set(e), r;
}
function Y(t, e) {
  let r = U(),
    n = Se(),
    i = Ye();
  return Am(n, r, r[ye], i, t, e), Y;
}
function AI(t, e, r) {
  let n = Se();
  if (n.firstCreatePass) {
    let i = On(t);
    mu(r, n.data, n.blueprint, i, !0), mu(e, n.data, n.blueprint, i, !1);
  }
}
function mu(t, e, r, n, i) {
  if (((t = qe(t)), Array.isArray(t)))
    for (let o = 0; o < t.length; o++) mu(t[o], e, r, n, i);
  else {
    let o = Se(),
      s = U(),
      a = Ye(),
      l = Ur(t) ? t : qe(t.provide),
      c = qp(t),
      u = a.providerIndexes & 1048575,
      d = a.directiveStart,
      f = a.providerIndexes >> 20;
    if (Ur(t) || !t.multi) {
      let g = new ar(c, i, w),
        C = Cc(l, e, i ? u : u + f, d);
      C === -1
        ? (kc(Fs(a, s), o, l),
          bc(o, t, e.length),
          e.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          i && (a.providerIndexes += 1048576),
          r.push(g),
          s.push(g))
        : ((r[C] = g), (s[C] = g));
    } else {
      let g = Cc(l, e, u + f, d),
        C = Cc(l, e, u, u + f),
        I = g >= 0 && r[g],
        x = C >= 0 && r[C];
      if ((i && !x) || (!i && !I)) {
        kc(Fs(a, s), o, l);
        let M = OI(i ? RI : NI, r.length, i, n, c);
        !i && x && (r[C].providerFactory = M),
          bc(o, t, e.length, 0),
          e.push(l),
          a.directiveStart++,
          a.directiveEnd++,
          i && (a.providerIndexes += 1048576),
          r.push(M),
          s.push(M);
      } else {
        let M = Pm(r[i ? C : g], c, !i && n);
        bc(o, t, g > -1 ? g : C, M);
      }
      !i && n && x && r[C].componentProviders++;
    }
  }
}
function bc(t, e, r, n) {
  let i = Ur(e),
    o = JD(e);
  if (i || o) {
    let l = (o ? qe(e.useClass) : e).prototype.ngOnDestroy;
    if (l) {
      let c = t.destroyHooks || (t.destroyHooks = []);
      if (!i && e.multi) {
        let u = c.indexOf(r);
        u === -1 ? c.push(r, [n, l]) : c[u + 1].push(n, l);
      } else c.push(r, l);
    }
  }
}
function Pm(t, e, r) {
  return r && t.componentProviders++, t.multi.push(e) - 1;
}
function Cc(t, e, r, n) {
  for (let i = r; i < n; i++) if (e[i] === t) return i;
  return -1;
}
function NI(t, e, r, n) {
  return yu(this.multi, []);
}
function RI(t, e, r, n) {
  let i = this.multi,
    o;
  if (this.providerFactory) {
    let s = this.providerFactory.componentProviders,
      a = lr(r, r[L], this.providerFactory.index, n);
    (o = a.slice(0, s)), yu(i, o);
    for (let l = s; l < a.length; l++) o.push(a[l]);
  } else (o = []), yu(i, o);
  return o;
}
function yu(t, e) {
  for (let r = 0; r < t.length; r++) {
    let n = t[r];
    e.push(n());
  }
  return e;
}
function OI(t, e, r, n, i) {
  let o = new ar(t, r, w);
  return (
    (o.multi = []),
    (o.index = e),
    (o.componentProviders = 0),
    Pm(o, i, n && !r),
    o
  );
}
function pr(t, e = []) {
  return (r) => {
    r.providersResolver = (n, i) => AI(n, i ? i(t) : t, e);
  };
}
var kI = (() => {
  let e = class e {
    constructor(n) {
      (this._injector = n), (this.cachedInjectors = new Map());
    }
    getOrCreateStandaloneInjector(n) {
      if (!n.standalone) return null;
      if (!this.cachedInjectors.has(n)) {
        let i = zp(!1, n.type),
          o =
            i.length > 0
              ? ba([i], this._injector, `Standalone[${n.type.name}]`)
              : null;
        this.cachedInjectors.set(n, o);
      }
      return this.cachedInjectors.get(n);
    }
    ngOnDestroy() {
      try {
        for (let n of this.cachedInjectors.values()) n !== null && n.destroy();
      } finally {
        this.cachedInjectors.clear();
      }
    }
  };
  e.ɵprov = E({
    token: e,
    providedIn: "environment",
    factory: () => new e(b(Qe)),
  });
  let t = e;
  return t;
})();
function Qi(t) {
  wa("NgStandalone"),
    (t.getStandaloneInjector = (e) =>
      e.get(kI).getOrCreateStandaloneInjector(t));
}
function Bn(t, e, r) {
  let n = Gi() + t,
    i = U();
  return i[n] === vn ? cd(i, n, r ? e.call(r) : e()) : QE(i, n);
}
function Jr(t, e, r, n) {
  return Lm(U(), Gi(), t, e, r, n);
}
function Ia(t, e, r, n, i) {
  return Vm(U(), Gi(), t, e, r, n, i);
}
function Fm(t, e) {
  let r = t[e];
  return r === vn ? void 0 : r;
}
function Lm(t, e, r, n, i, o) {
  let s = e + r;
  return Fn(t, s, i) ? cd(t, s + 1, o ? n.call(o, i) : n(i)) : Fm(t, s + 1);
}
function Vm(t, e, r, n, i, o, s) {
  let a = e + r;
  return YE(t, a, i, o)
    ? cd(t, a + 2, s ? n.call(s, i, o) : n(i, o))
    : Fm(t, a + 2);
}
function Me(t, e) {
  let r = Se(),
    n,
    i = t + nt;
  r.firstCreatePass
    ? ((n = PI(e, r.pipeRegistry)),
      (r.data[i] = n),
      n.onDestroy && (r.destroyHooks ??= []).push(i, n.onDestroy))
    : (n = r.data[i]);
  let o = n.factory || (n.factory = rr(n.type, !0)),
    s,
    a = tt(w);
  try {
    let l = Ps(!1),
      c = o();
    return Ps(l), xI(r, U(), i, c), c;
  } finally {
    tt(a);
  }
}
function PI(t, e) {
  if (e)
    for (let r = e.length - 1; r >= 0; r--) {
      let n = e[r];
      if (t === n.name) return n;
    }
}
function je(t, e, r) {
  let n = t + nt,
    i = U(),
    o = Ru(i, n);
  return jm(i, n) ? Lm(i, Gi(), e, o.transform, r, o) : o.transform(r);
}
function ei(t, e, r, n) {
  let i = t + nt,
    o = U(),
    s = Ru(o, i);
  return jm(o, i) ? Vm(o, Gi(), e, s.transform, r, n, s) : s.transform(r, n);
}
function jm(t, e) {
  return t[L].data[e].pure;
}
function _a(t, e) {
  return va(t, e);
}
var bs = null;
function FI(t) {
  (bs !== null &&
    (t.defaultEncapsulation !== bs.defaultEncapsulation ||
      t.preserveWhitespaces !== bs.preserveWhitespaces)) ||
    (bs = t);
}
var Sa = (() => {
  let e = class e {
    log(n) {
      console.log(n);
    }
    warn(n) {
      console.warn(n);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "platform" }));
  let t = e;
  return t;
})();
var fd = new S(""),
  Yi = new S(""),
  Ma = (() => {
    let e = class e {
      constructor(n, i, o) {
        (this._ngZone = n),
          (this.registry = i),
          (this._pendingCount = 0),
          (this._isZoneStable = !0),
          (this._callbacks = []),
          (this.taskTrackingZone = null),
          hd || (LI(o), o.addToWindow(i)),
          this._watchAngularEvents(),
          n.run(() => {
            this.taskTrackingZone =
              typeof Zone > "u" ? null : Zone.current.get("TaskTrackingZone");
          });
      }
      _watchAngularEvents() {
        this._ngZone.onUnstable.subscribe({
          next: () => {
            this._isZoneStable = !1;
          },
        }),
          this._ngZone.runOutsideAngular(() => {
            this._ngZone.onStable.subscribe({
              next: () => {
                ie.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    (this._isZoneStable = !0), this._runCallbacksIfReady();
                  });
              },
            });
          });
      }
      increasePendingRequestCount() {
        return (this._pendingCount += 1), this._pendingCount;
      }
      decreasePendingRequestCount() {
        if (((this._pendingCount -= 1), this._pendingCount < 0))
          throw new Error("pending async requests below zero");
        return this._runCallbacksIfReady(), this._pendingCount;
      }
      isStable() {
        return (
          this._isZoneStable &&
          this._pendingCount === 0 &&
          !this._ngZone.hasPendingMacrotasks
        );
      }
      _runCallbacksIfReady() {
        if (this.isStable())
          queueMicrotask(() => {
            for (; this._callbacks.length !== 0; ) {
              let n = this._callbacks.pop();
              clearTimeout(n.timeoutId), n.doneCb();
            }
          });
        else {
          let n = this.getPendingTasks();
          this._callbacks = this._callbacks.filter((i) =>
            i.updateCb && i.updateCb(n) ? (clearTimeout(i.timeoutId), !1) : !0
          );
        }
      }
      getPendingTasks() {
        return this.taskTrackingZone
          ? this.taskTrackingZone.macroTasks.map((n) => ({
              source: n.source,
              creationLocation: n.creationLocation,
              data: n.data,
            }))
          : [];
      }
      addCallback(n, i, o) {
        let s = -1;
        i &&
          i > 0 &&
          (s = setTimeout(() => {
            (this._callbacks = this._callbacks.filter(
              (a) => a.timeoutId !== s
            )),
              n();
          }, i)),
          this._callbacks.push({ doneCb: n, timeoutId: s, updateCb: o });
      }
      whenStable(n, i, o) {
        if (o && !this.taskTrackingZone)
          throw new Error(
            'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
          );
        this.addCallback(n, i, o), this._runCallbacksIfReady();
      }
      getPendingRequestCount() {
        return this._pendingCount;
      }
      registerApplication(n) {
        this.registry.registerApplication(n, this);
      }
      unregisterApplication(n) {
        this.registry.unregisterApplication(n);
      }
      findProviders(n, i, o) {
        return [];
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(ie), b(xa), b(Yi));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  xa = (() => {
    let e = class e {
      constructor() {
        this._applications = new Map();
      }
      registerApplication(n, i) {
        this._applications.set(n, i);
      }
      unregisterApplication(n) {
        this._applications.delete(n);
      }
      unregisterAllApplications() {
        this._applications.clear();
      }
      getTestability(n) {
        return this._applications.get(n) || null;
      }
      getAllTestabilities() {
        return Array.from(this._applications.values());
      }
      getAllRootElements() {
        return Array.from(this._applications.keys());
      }
      findTestabilityInTree(n, i = !0) {
        return hd?.findTestabilityInTree(this, n, i) ?? null;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "platform" }));
    let t = e;
    return t;
  })();
function LI(t) {
  hd = t;
}
var hd;
function $n(t) {
  return !!t && typeof t.then == "function";
}
function pd(t) {
  return !!t && typeof t.subscribe == "function";
}
var Ta = new S(""),
  Bm = (() => {
    let e = class e {
      constructor() {
        (this.initialized = !1),
          (this.done = !1),
          (this.donePromise = new Promise((n, i) => {
            (this.resolve = n), (this.reject = i);
          })),
          (this.appInits = D(Ta, { optional: !0 }) ?? []);
      }
      runInitializers() {
        if (this.initialized) return;
        let n = [];
        for (let o of this.appInits) {
          let s = o();
          if ($n(s)) n.push(s);
          else if (pd(s)) {
            let a = new Promise((l, c) => {
              s.subscribe({ complete: l, error: c });
            });
            n.push(a);
          }
        }
        let i = () => {
          (this.done = !0), this.resolve();
        };
        Promise.all(n)
          .then(() => {
            i();
          })
          .catch((o) => {
            this.reject(o);
          }),
          n.length === 0 && i(),
          (this.initialized = !0);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Aa = new S("");
function VI() {
  oh(() => {
    throw new _(600, !1);
  });
}
function jI(t) {
  return t.isBoundToModule;
}
function BI(t, e, r) {
  try {
    let n = r();
    return $n(n)
      ? n.catch((i) => {
          throw (e.runOutsideAngular(() => t.handleError(i)), i);
        })
      : n;
  } catch (n) {
    throw (e.runOutsideAngular(() => t.handleError(n)), n);
  }
}
function $m(t, e) {
  return Array.isArray(e) ? e.reduce($m, t) : v(v({}, t), e);
}
var gr = (() => {
  let e = class e {
    constructor() {
      (this._bootstrapListeners = []),
        (this._runningTick = !1),
        (this._destroyed = !1),
        (this._destroyListeners = []),
        (this._views = []),
        (this.internalErrorHandler = D(Sg)),
        (this.afterRenderEffectManager = D(sd)),
        (this.externalTestViews = new Set()),
        (this.beforeRender = new me()),
        (this.afterTick = new me()),
        (this.componentTypes = []),
        (this.components = []),
        (this.isStable = D(hr).hasPendingTasks.pipe(k((n) => !n))),
        (this._injector = D(Qe));
    }
    get destroyed() {
      return this._destroyed;
    }
    get injector() {
      return this._injector;
    }
    bootstrap(n, i) {
      let o = n instanceof Bs;
      if (!this._injector.get(Bm).done) {
        let g = !o && Bp(n),
          C = !1;
        throw new _(405, C);
      }
      let a;
      o ? (a = n) : (a = this._injector.get(Da).resolveComponentFactory(n)),
        this.componentTypes.push(a.componentType);
      let l = jI(a) ? void 0 : this._injector.get(Pn),
        c = i || a.selector,
        u = a.create(Ot.NULL, [], c, l),
        d = u.location.nativeElement,
        f = u.injector.get(fd, null);
      return (
        f?.registerApplication(d),
        u.onDestroy(() => {
          this.detachView(u.hostView),
            Ms(this.components, u),
            f?.unregisterApplication(d);
        }),
        this._loadComponent(u),
        u
      );
    }
    tick() {
      this._tick(!0);
    }
    _tick(n) {
      if (this._runningTick) throw new _(101, !1);
      let i = W(null);
      try {
        (this._runningTick = !0), this.detectChangesInAttachedViews(n);
      } catch (o) {
        this.internalErrorHandler(o);
      } finally {
        this.afterTick.next(), (this._runningTick = !1), W(i);
      }
    }
    detectChangesInAttachedViews(n) {
      let i = 0,
        o = this.afterRenderEffectManager;
      for (;;) {
        if (i === Dm) throw new _(103, !1);
        if (n) {
          let s = i === 0;
          this.beforeRender.next(s);
          for (let { _lView: a, notifyErrorHandler: l } of this._views)
            $I(a, s, l);
        }
        if (
          (i++,
          o.executeInternalCallbacks(),
          ![...this.externalTestViews.keys(), ...this._views].some(
            ({ _lView: s }) => vu(s)
          ) &&
            (o.execute(),
            ![...this.externalTestViews.keys(), ...this._views].some(
              ({ _lView: s }) => vu(s)
            )))
        )
          break;
      }
    }
    attachView(n) {
      let i = n;
      this._views.push(i), i.attachToAppRef(this);
    }
    detachView(n) {
      let i = n;
      Ms(this._views, i), i.detachFromAppRef();
    }
    _loadComponent(n) {
      this.attachView(n.hostView), this.tick(), this.components.push(n);
      let i = this._injector.get(Aa, []);
      [...this._bootstrapListeners, ...i].forEach((o) => o(n));
    }
    ngOnDestroy() {
      if (!this._destroyed)
        try {
          this._destroyListeners.forEach((n) => n()),
            this._views.slice().forEach((n) => n.destroy());
        } finally {
          (this._destroyed = !0),
            (this._views = []),
            (this._bootstrapListeners = []),
            (this._destroyListeners = []);
        }
    }
    onDestroy(n) {
      return (
        this._destroyListeners.push(n), () => Ms(this._destroyListeners, n)
      );
    }
    destroy() {
      if (this._destroyed) throw new _(406, !1);
      let n = this._injector;
      n.destroy && !n.destroyed && n.destroy();
    }
    get viewCount() {
      return this._views.length;
    }
    warnIfDestroyed() {}
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function Ms(t, e) {
  let r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}
function $I(t, e, r) {
  (!e && !vu(t)) || UI(t, r, e);
}
function vu(t) {
  return ku(t);
}
function UI(t, e, r) {
  let n;
  r ? ((n = 0), (t[N] |= 1024)) : t[N] & 64 ? (n = 0) : (n = 1), wm(t, e, n);
}
var Du = class {
    constructor(e, r) {
      (this.ngModuleFactory = e), (this.componentFactories = r);
    }
  },
  Na = (() => {
    let e = class e {
      compileModuleSync(n) {
        return new Ws(n);
      }
      compileModuleAsync(n) {
        return Promise.resolve(this.compileModuleSync(n));
      }
      compileModuleAndAllComponentsSync(n) {
        let i = this.compileModuleSync(n),
          o = $p(n),
          s = qg(o.declarations).reduce((a, l) => {
            let c = Rn(l);
            return c && a.push(new Gr(c)), a;
          }, []);
        return new Du(i, s);
      }
      compileModuleAndAllComponentsAsync(n) {
        return Promise.resolve(this.compileModuleAndAllComponentsSync(n));
      }
      clearCache() {}
      clearCacheFor(n) {}
      getModuleId(n) {}
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  HI = new S("");
function zI(t, e, r) {
  let n = new Ws(r);
  return Promise.resolve(n);
}
function vp(t) {
  for (let e = t.length - 1; e >= 0; e--) if (t[e] !== void 0) return t[e];
}
var WI = (() => {
  let e = class e {
    constructor() {
      (this.zone = D(ie)), (this.applicationRef = D(gr));
    }
    initialize() {
      this._onMicrotaskEmptySubscription ||
        (this._onMicrotaskEmptySubscription =
          this.zone.onMicrotaskEmpty.subscribe({
            next: () => {
              this.zone.run(() => {
                this.applicationRef.tick();
              });
            },
          }));
    }
    ngOnDestroy() {
      this._onMicrotaskEmptySubscription?.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function GI(t) {
  return [
    { provide: ie, useFactory: t },
    {
      provide: $r,
      multi: !0,
      useFactory: () => {
        let e = D(WI, { optional: !0 });
        return () => e.initialize();
      },
    },
    {
      provide: $r,
      multi: !0,
      useFactory: () => {
        let e = D(QI);
        return () => {
          e.initialize();
        };
      },
    },
    { provide: Sg, useFactory: qI },
  ];
}
function qI() {
  let t = D(ie),
    e = D(Wt);
  return (r) => t.runOutsideAngular(() => e.handleError(r));
}
function ZI(t) {
  return {
    enableLongStackTrace: !1,
    shouldCoalesceEventChangeDetection: t?.eventCoalescing ?? !1,
    shouldCoalesceRunChangeDetection: t?.runCoalescing ?? !1,
  };
}
var QI = (() => {
  let e = class e {
    constructor() {
      (this.subscription = new De()),
        (this.initialized = !1),
        (this.zone = D(ie)),
        (this.pendingTasks = D(hr));
    }
    initialize() {
      if (this.initialized) return;
      this.initialized = !0;
      let n = null;
      !this.zone.isStable &&
        !this.zone.hasPendingMacrotasks &&
        !this.zone.hasPendingMicrotasks &&
        (n = this.pendingTasks.add()),
        this.zone.runOutsideAngular(() => {
          this.subscription.add(
            this.zone.onStable.subscribe(() => {
              ie.assertNotInAngularZone(),
                queueMicrotask(() => {
                  n !== null &&
                    !this.zone.hasPendingMacrotasks &&
                    !this.zone.hasPendingMicrotasks &&
                    (this.pendingTasks.remove(n), (n = null));
                });
            })
          );
        }),
        this.subscription.add(
          this.zone.onUnstable.subscribe(() => {
            ie.assertInAngularZone(), (n ??= this.pendingTasks.add());
          })
        );
    }
    ngOnDestroy() {
      this.subscription.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function YI() {
  return (typeof $localize < "u" && $localize.locale) || qs;
}
var Ra = new S("", {
  providedIn: "root",
  factory: () => D(Ra, $.Optional | $.SkipSelf) || YI(),
});
var Um = new S(""),
  Hm = (() => {
    let e = class e {
      constructor(n) {
        (this._injector = n),
          (this._modules = []),
          (this._destroyListeners = []),
          (this._destroyed = !1);
      }
      bootstrapModuleFactory(n, i) {
        let o = sE(
          i?.ngZone,
          ZI({
            eventCoalescing: i?.ngZoneEventCoalescing,
            runCoalescing: i?.ngZoneRunCoalescing,
          })
        );
        return o.run(() => {
          let s = GE(
              n.moduleType,
              this.injector,
              GI(() => o)
            ),
            a = s.injector.get(Wt, null);
          return (
            o.runOutsideAngular(() => {
              let l = o.onError.subscribe({
                next: (c) => {
                  a.handleError(c);
                },
              });
              s.onDestroy(() => {
                Ms(this._modules, s), l.unsubscribe();
              });
            }),
            BI(a, o, () => {
              let l = s.injector.get(Bm);
              return (
                l.runInitializers(),
                l.donePromise.then(() => {
                  let c = s.injector.get(Ra, qs);
                  return _I(c || qs), this._moduleDoBootstrap(s), s;
                })
              );
            })
          );
        });
      }
      bootstrapModule(n, i = []) {
        let o = $m({}, i);
        return zI(this.injector, o, n).then((s) =>
          this.bootstrapModuleFactory(s, o)
        );
      }
      _moduleDoBootstrap(n) {
        let i = n.injector.get(gr);
        if (n._bootstrapComponents.length > 0)
          n._bootstrapComponents.forEach((o) => i.bootstrap(o));
        else if (n.instance.ngDoBootstrap) n.instance.ngDoBootstrap(i);
        else throw new _(-403, !1);
        this._modules.push(n);
      }
      onDestroy(n) {
        this._destroyListeners.push(n);
      }
      get injector() {
        return this._injector;
      }
      destroy() {
        if (this._destroyed) throw new _(404, !1);
        this._modules.slice().forEach((i) => i.destroy()),
          this._destroyListeners.forEach((i) => i());
        let n = this._injector.get(Um, null);
        n && (n.forEach((i) => i()), n.clear()), (this._destroyed = !0);
      }
      get destroyed() {
        return this._destroyed;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Ot));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "platform" }));
    let t = e;
    return t;
  })(),
  Ni = null,
  zm = new S("");
function KI(t) {
  if (Ni && !Ni.get(zm, !1)) throw new _(400, !1);
  VI(), (Ni = t);
  let e = t.get(Hm);
  return e_(t), e;
}
function gd(t, e, r = []) {
  let n = `Platform: ${e}`,
    i = new S(n);
  return (o = []) => {
    let s = Wm();
    if (!s || s.injector.get(zm, !1)) {
      let a = [...r, ...o, { provide: i, useValue: !0 }];
      t ? t(a) : KI(XI(a, n));
    }
    return JI(i);
  };
}
function XI(t = [], e) {
  return Ot.create({
    name: e,
    providers: [
      { provide: na, useValue: "platform" },
      { provide: Um, useValue: new Set([() => (Ni = null)]) },
      ...t,
    ],
  });
}
function JI(t) {
  let e = Wm();
  if (!e) throw new _(401, !1);
  return e;
}
function Wm() {
  return Ni?.get(Hm) ?? null;
}
function e_(t) {
  t.get(Hu, null)?.forEach((r) => r());
}
var Un = (() => {
  let e = class e {};
  e.__NG_ELEMENT_ID__ = t_;
  let t = e;
  return t;
})();
function t_(t) {
  return n_(Ye(), U(), (t & 16) === 16);
}
function n_(t, e, r) {
  if (ia(t) && !r) {
    let n = Ln(t.index, e);
    return new cr(n, n);
  } else if (t.type & 47) {
    let n = e[Nt];
    return new cr(n, e);
  }
  return null;
}
var wu = class {
    constructor() {}
    supports(e) {
      return xm(e);
    }
    create(e) {
      return new bu(e);
    }
  },
  r_ = (t, e) => e,
  bu = class {
    constructor(e) {
      (this.length = 0),
        (this._linkedRecords = null),
        (this._unlinkedRecords = null),
        (this._previousItHead = null),
        (this._itHead = null),
        (this._itTail = null),
        (this._additionsHead = null),
        (this._additionsTail = null),
        (this._movesHead = null),
        (this._movesTail = null),
        (this._removalsHead = null),
        (this._removalsTail = null),
        (this._identityChangesHead = null),
        (this._identityChangesTail = null),
        (this._trackByFn = e || r_);
    }
    forEachItem(e) {
      let r;
      for (r = this._itHead; r !== null; r = r._next) e(r);
    }
    forEachOperation(e) {
      let r = this._itHead,
        n = this._removalsHead,
        i = 0,
        o = null;
      for (; r || n; ) {
        let s = !n || (r && r.currentIndex < Dp(n, i, o)) ? r : n,
          a = Dp(s, i, o),
          l = s.currentIndex;
        if (s === n) i--, (n = n._nextRemoved);
        else if (((r = r._next), s.previousIndex == null)) i++;
        else {
          o || (o = []);
          let c = a - i,
            u = l - i;
          if (c != u) {
            for (let f = 0; f < c; f++) {
              let g = f < o.length ? o[f] : (o[f] = 0),
                C = g + f;
              u <= C && C < c && (o[f] = g + 1);
            }
            let d = s.previousIndex;
            o[d] = u - c;
          }
        }
        a !== l && e(s, a, l);
      }
    }
    forEachPreviousItem(e) {
      let r;
      for (r = this._previousItHead; r !== null; r = r._nextPrevious) e(r);
    }
    forEachAddedItem(e) {
      let r;
      for (r = this._additionsHead; r !== null; r = r._nextAdded) e(r);
    }
    forEachMovedItem(e) {
      let r;
      for (r = this._movesHead; r !== null; r = r._nextMoved) e(r);
    }
    forEachRemovedItem(e) {
      let r;
      for (r = this._removalsHead; r !== null; r = r._nextRemoved) e(r);
    }
    forEachIdentityChange(e) {
      let r;
      for (r = this._identityChangesHead; r !== null; r = r._nextIdentityChange)
        e(r);
    }
    diff(e) {
      if ((e == null && (e = []), !xm(e))) throw new _(900, !1);
      return this.check(e) ? this : null;
    }
    onDestroy() {}
    check(e) {
      this._reset();
      let r = this._itHead,
        n = !1,
        i,
        o,
        s;
      if (Array.isArray(e)) {
        this.length = e.length;
        for (let a = 0; a < this.length; a++)
          (o = e[a]),
            (s = this._trackByFn(a, o)),
            r === null || !Object.is(r.trackById, s)
              ? ((r = this._mismatch(r, o, s, a)), (n = !0))
              : (n && (r = this._verifyReinsertion(r, o, s, a)),
                Object.is(r.item, o) || this._addIdentityChange(r, o)),
            (r = r._next);
      } else
        (i = 0),
          qE(e, (a) => {
            (s = this._trackByFn(i, a)),
              r === null || !Object.is(r.trackById, s)
                ? ((r = this._mismatch(r, a, s, i)), (n = !0))
                : (n && (r = this._verifyReinsertion(r, a, s, i)),
                  Object.is(r.item, a) || this._addIdentityChange(r, a)),
              (r = r._next),
              i++;
          }),
          (this.length = i);
      return this._truncate(r), (this.collection = e), this.isDirty;
    }
    get isDirty() {
      return (
        this._additionsHead !== null ||
        this._movesHead !== null ||
        this._removalsHead !== null ||
        this._identityChangesHead !== null
      );
    }
    _reset() {
      if (this.isDirty) {
        let e;
        for (e = this._previousItHead = this._itHead; e !== null; e = e._next)
          e._nextPrevious = e._next;
        for (e = this._additionsHead; e !== null; e = e._nextAdded)
          e.previousIndex = e.currentIndex;
        for (
          this._additionsHead = this._additionsTail = null, e = this._movesHead;
          e !== null;
          e = e._nextMoved
        )
          e.previousIndex = e.currentIndex;
        (this._movesHead = this._movesTail = null),
          (this._removalsHead = this._removalsTail = null),
          (this._identityChangesHead = this._identityChangesTail = null);
      }
    }
    _mismatch(e, r, n, i) {
      let o;
      return (
        e === null ? (o = this._itTail) : ((o = e._prev), this._remove(e)),
        (e =
          this._unlinkedRecords === null
            ? null
            : this._unlinkedRecords.get(n, null)),
        e !== null
          ? (Object.is(e.item, r) || this._addIdentityChange(e, r),
            this._reinsertAfter(e, o, i))
          : ((e =
              this._linkedRecords === null
                ? null
                : this._linkedRecords.get(n, i)),
            e !== null
              ? (Object.is(e.item, r) || this._addIdentityChange(e, r),
                this._moveAfter(e, o, i))
              : (e = this._addAfter(new Cu(r, n), o, i))),
        e
      );
    }
    _verifyReinsertion(e, r, n, i) {
      let o =
        this._unlinkedRecords === null
          ? null
          : this._unlinkedRecords.get(n, null);
      return (
        o !== null
          ? (e = this._reinsertAfter(o, e._prev, i))
          : e.currentIndex != i &&
            ((e.currentIndex = i), this._addToMoves(e, i)),
        e
      );
    }
    _truncate(e) {
      for (; e !== null; ) {
        let r = e._next;
        this._addToRemovals(this._unlink(e)), (e = r);
      }
      this._unlinkedRecords !== null && this._unlinkedRecords.clear(),
        this._additionsTail !== null && (this._additionsTail._nextAdded = null),
        this._movesTail !== null && (this._movesTail._nextMoved = null),
        this._itTail !== null && (this._itTail._next = null),
        this._removalsTail !== null && (this._removalsTail._nextRemoved = null),
        this._identityChangesTail !== null &&
          (this._identityChangesTail._nextIdentityChange = null);
    }
    _reinsertAfter(e, r, n) {
      this._unlinkedRecords !== null && this._unlinkedRecords.remove(e);
      let i = e._prevRemoved,
        o = e._nextRemoved;
      return (
        i === null ? (this._removalsHead = o) : (i._nextRemoved = o),
        o === null ? (this._removalsTail = i) : (o._prevRemoved = i),
        this._insertAfter(e, r, n),
        this._addToMoves(e, n),
        e
      );
    }
    _moveAfter(e, r, n) {
      return (
        this._unlink(e), this._insertAfter(e, r, n), this._addToMoves(e, n), e
      );
    }
    _addAfter(e, r, n) {
      return (
        this._insertAfter(e, r, n),
        this._additionsTail === null
          ? (this._additionsTail = this._additionsHead = e)
          : (this._additionsTail = this._additionsTail._nextAdded = e),
        e
      );
    }
    _insertAfter(e, r, n) {
      let i = r === null ? this._itHead : r._next;
      return (
        (e._next = i),
        (e._prev = r),
        i === null ? (this._itTail = e) : (i._prev = e),
        r === null ? (this._itHead = e) : (r._next = e),
        this._linkedRecords === null && (this._linkedRecords = new Zs()),
        this._linkedRecords.put(e),
        (e.currentIndex = n),
        e
      );
    }
    _remove(e) {
      return this._addToRemovals(this._unlink(e));
    }
    _unlink(e) {
      this._linkedRecords !== null && this._linkedRecords.remove(e);
      let r = e._prev,
        n = e._next;
      return (
        r === null ? (this._itHead = n) : (r._next = n),
        n === null ? (this._itTail = r) : (n._prev = r),
        e
      );
    }
    _addToMoves(e, r) {
      return (
        e.previousIndex === r ||
          (this._movesTail === null
            ? (this._movesTail = this._movesHead = e)
            : (this._movesTail = this._movesTail._nextMoved = e)),
        e
      );
    }
    _addToRemovals(e) {
      return (
        this._unlinkedRecords === null && (this._unlinkedRecords = new Zs()),
        this._unlinkedRecords.put(e),
        (e.currentIndex = null),
        (e._nextRemoved = null),
        this._removalsTail === null
          ? ((this._removalsTail = this._removalsHead = e),
            (e._prevRemoved = null))
          : ((e._prevRemoved = this._removalsTail),
            (this._removalsTail = this._removalsTail._nextRemoved = e)),
        e
      );
    }
    _addIdentityChange(e, r) {
      return (
        (e.item = r),
        this._identityChangesTail === null
          ? (this._identityChangesTail = this._identityChangesHead = e)
          : (this._identityChangesTail =
              this._identityChangesTail._nextIdentityChange =
                e),
        e
      );
    }
  },
  Cu = class {
    constructor(e, r) {
      (this.item = e),
        (this.trackById = r),
        (this.currentIndex = null),
        (this.previousIndex = null),
        (this._nextPrevious = null),
        (this._prev = null),
        (this._next = null),
        (this._prevDup = null),
        (this._nextDup = null),
        (this._prevRemoved = null),
        (this._nextRemoved = null),
        (this._nextAdded = null),
        (this._nextMoved = null),
        (this._nextIdentityChange = null);
    }
  },
  Eu = class {
    constructor() {
      (this._head = null), (this._tail = null);
    }
    add(e) {
      this._head === null
        ? ((this._head = this._tail = e),
          (e._nextDup = null),
          (e._prevDup = null))
        : ((this._tail._nextDup = e),
          (e._prevDup = this._tail),
          (e._nextDup = null),
          (this._tail = e));
    }
    get(e, r) {
      let n;
      for (n = this._head; n !== null; n = n._nextDup)
        if ((r === null || r <= n.currentIndex) && Object.is(n.trackById, e))
          return n;
      return null;
    }
    remove(e) {
      let r = e._prevDup,
        n = e._nextDup;
      return (
        r === null ? (this._head = n) : (r._nextDup = n),
        n === null ? (this._tail = r) : (n._prevDup = r),
        this._head === null
      );
    }
  },
  Zs = class {
    constructor() {
      this.map = new Map();
    }
    put(e) {
      let r = e.trackById,
        n = this.map.get(r);
      n || ((n = new Eu()), this.map.set(r, n)), n.add(e);
    }
    get(e, r) {
      let n = e,
        i = this.map.get(n);
      return i ? i.get(e, r) : null;
    }
    remove(e) {
      let r = e.trackById;
      return this.map.get(r).remove(e) && this.map.delete(r), e;
    }
    get isEmpty() {
      return this.map.size === 0;
    }
    clear() {
      this.map.clear();
    }
  };
function Dp(t, e, r) {
  let n = t.previousIndex;
  if (n === null) return n;
  let i = 0;
  return r && n < r.length && (i = r[n]), n + e + i;
}
function wp() {
  return new md([new wu()]);
}
var md = (() => {
  let e = class e {
    constructor(n) {
      this.factories = n;
    }
    static create(n, i) {
      if (i != null) {
        let o = i.factories.slice();
        n = n.concat(o);
      }
      return new e(n);
    }
    static extend(n) {
      return {
        provide: e,
        useFactory: (i) => e.create(n, i || wp()),
        deps: [[e, new _u(), new Js()]],
      };
    }
    find(n) {
      let i = this.factories.find((o) => o.supports(n));
      if (i != null) return i;
      throw new _(901, !1);
    }
  };
  e.ɵprov = E({ token: e, providedIn: "root", factory: wp });
  let t = e;
  return t;
})();
var Gm = gd(null, "core", []),
  qm = (() => {
    let e = class e {
      constructor(n) {}
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(gr));
    }),
      (e.ɵmod = Re({ type: e })),
      (e.ɵinj = Ne({}));
    let t = e;
    return t;
  })();
function mr(t) {
  return typeof t == "boolean" ? t : t != null && t !== "false";
}
function yd(t) {
  let e = W(null);
  try {
    return t();
  } finally {
    W(e);
  }
}
function Zm(t) {
  let e = Rn(t);
  if (!e) return null;
  let r = new Gr(e);
  return {
    get selector() {
      return r.selector;
    },
    get type() {
      return r.componentType;
    },
    get inputs() {
      return r.inputs;
    },
    get outputs() {
      return r.outputs;
    },
    get ngContentSelectors() {
      return r.ngContentSelectors;
    },
    get isStandalone() {
      return e.standalone;
    },
    get isSignal() {
      return e.signals;
    },
  };
}
var ty = null;
function Yt() {
  return ty;
}
function ny(t) {
  ty ??= t;
}
var $a = class {};
var Te = new S(""),
  Td = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("");
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: () => D(i_), providedIn: "platform" }));
    let t = e;
    return t;
  })(),
  ry = new S(""),
  i_ = (() => {
    let e = class e extends Td {
      constructor() {
        super(),
          (this._doc = D(Te)),
          (this._location = window.location),
          (this._history = window.history);
      }
      getBaseHrefFromDOM() {
        return Yt().getBaseHref(this._doc);
      }
      onPopState(n) {
        let i = Yt().getGlobalEventTarget(this._doc, "window");
        return (
          i.addEventListener("popstate", n, !1),
          () => i.removeEventListener("popstate", n)
        );
      }
      onHashChange(n) {
        let i = Yt().getGlobalEventTarget(this._doc, "window");
        return (
          i.addEventListener("hashchange", n, !1),
          () => i.removeEventListener("hashchange", n)
        );
      }
      get href() {
        return this._location.href;
      }
      get protocol() {
        return this._location.protocol;
      }
      get hostname() {
        return this._location.hostname;
      }
      get port() {
        return this._location.port;
      }
      get pathname() {
        return this._location.pathname;
      }
      get search() {
        return this._location.search;
      }
      get hash() {
        return this._location.hash;
      }
      set pathname(n) {
        this._location.pathname = n;
      }
      pushState(n, i, o) {
        this._history.pushState(n, i, o);
      }
      replaceState(n, i, o) {
        this._history.replaceState(n, i, o);
      }
      forward() {
        this._history.forward();
      }
      back() {
        this._history.back();
      }
      historyGo(n = 0) {
        this._history.go(n);
      }
      getState() {
        return this._history.state;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({
        token: e,
        factory: () => new e(),
        providedIn: "platform",
      }));
    let t = e;
    return t;
  })();
function Ad(t, e) {
  if (t.length == 0) return e;
  if (e.length == 0) return t;
  let r = 0;
  return (
    t.endsWith("/") && r++,
    e.startsWith("/") && r++,
    r == 2 ? t + e.substring(1) : r == 1 ? t + e : t + "/" + e
  );
}
function Qm(t) {
  let e = t.match(/#|\?|$/),
    r = (e && e.index) || t.length,
    n = r - (t[r - 1] === "/" ? 1 : 0);
  return t.slice(0, n) + t.slice(r);
}
function wn(t) {
  return t && t[0] !== "?" ? "?" + t : t;
}
var Cn = (() => {
    let e = class e {
      historyGo(n) {
        throw new Error("");
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: () => D(Nd), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  iy = new S(""),
  Nd = (() => {
    let e = class e extends Cn {
      constructor(n, i) {
        super(),
          (this._platformLocation = n),
          (this._removeListenerFns = []),
          (this._baseHref =
            i ??
            this._platformLocation.getBaseHrefFromDOM() ??
            D(Te).location?.origin ??
            "");
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      prepareExternalUrl(n) {
        return Ad(this._baseHref, n);
      }
      path(n = !1) {
        let i =
            this._platformLocation.pathname + wn(this._platformLocation.search),
          o = this._platformLocation.hash;
        return o && n ? `${i}${o}` : i;
      }
      pushState(n, i, o, s) {
        let a = this.prepareExternalUrl(o + wn(s));
        this._platformLocation.pushState(n, i, a);
      }
      replaceState(n, i, o, s) {
        let a = this.prepareExternalUrl(o + wn(s));
        this._platformLocation.replaceState(n, i, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Td), b(iy, 8));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  oy = (() => {
    let e = class e extends Cn {
      constructor(n, i) {
        super(),
          (this._platformLocation = n),
          (this._baseHref = ""),
          (this._removeListenerFns = []),
          i != null && (this._baseHref = i);
      }
      ngOnDestroy() {
        for (; this._removeListenerFns.length; )
          this._removeListenerFns.pop()();
      }
      onPopState(n) {
        this._removeListenerFns.push(
          this._platformLocation.onPopState(n),
          this._platformLocation.onHashChange(n)
        );
      }
      getBaseHref() {
        return this._baseHref;
      }
      path(n = !1) {
        let i = this._platformLocation.hash ?? "#";
        return i.length > 0 ? i.substring(1) : i;
      }
      prepareExternalUrl(n) {
        let i = Ad(this._baseHref, n);
        return i.length > 0 ? "#" + i : i;
      }
      pushState(n, i, o, s) {
        let a = this.prepareExternalUrl(o + wn(s));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.pushState(n, i, a);
      }
      replaceState(n, i, o, s) {
        let a = this.prepareExternalUrl(o + wn(s));
        a.length == 0 && (a = this._platformLocation.pathname),
          this._platformLocation.replaceState(n, i, a);
      }
      forward() {
        this._platformLocation.forward();
      }
      back() {
        this._platformLocation.back();
      }
      getState() {
        return this._platformLocation.getState();
      }
      historyGo(n = 0) {
        this._platformLocation.historyGo?.(n);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Td), b(iy, 8));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  ni = (() => {
    let e = class e {
      constructor(n) {
        (this._subject = new pe()),
          (this._urlChangeListeners = []),
          (this._urlChangeSubscription = null),
          (this._locationStrategy = n);
        let i = this._locationStrategy.getBaseHref();
        (this._basePath = a_(Qm(Ym(i)))),
          this._locationStrategy.onPopState((o) => {
            this._subject.emit({
              url: this.path(!0),
              pop: !0,
              state: o.state,
              type: o.type,
            });
          });
      }
      ngOnDestroy() {
        this._urlChangeSubscription?.unsubscribe(),
          (this._urlChangeListeners = []);
      }
      path(n = !1) {
        return this.normalize(this._locationStrategy.path(n));
      }
      getState() {
        return this._locationStrategy.getState();
      }
      isCurrentPathEqualTo(n, i = "") {
        return this.path() == this.normalize(n + wn(i));
      }
      normalize(n) {
        return e.stripTrailingSlash(s_(this._basePath, Ym(n)));
      }
      prepareExternalUrl(n) {
        return (
          n && n[0] !== "/" && (n = "/" + n),
          this._locationStrategy.prepareExternalUrl(n)
        );
      }
      go(n, i = "", o = null) {
        this._locationStrategy.pushState(o, "", n, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + wn(i)), o);
      }
      replaceState(n, i = "", o = null) {
        this._locationStrategy.replaceState(o, "", n, i),
          this._notifyUrlChangeListeners(this.prepareExternalUrl(n + wn(i)), o);
      }
      forward() {
        this._locationStrategy.forward();
      }
      back() {
        this._locationStrategy.back();
      }
      historyGo(n = 0) {
        this._locationStrategy.historyGo?.(n);
      }
      onUrlChange(n) {
        return (
          this._urlChangeListeners.push(n),
          (this._urlChangeSubscription ??= this.subscribe((i) => {
            this._notifyUrlChangeListeners(i.url, i.state);
          })),
          () => {
            let i = this._urlChangeListeners.indexOf(n);
            this._urlChangeListeners.splice(i, 1),
              this._urlChangeListeners.length === 0 &&
                (this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeSubscription = null));
          }
        );
      }
      _notifyUrlChangeListeners(n = "", i) {
        this._urlChangeListeners.forEach((o) => o(n, i));
      }
      subscribe(n, i, o) {
        return this._subject.subscribe({ next: n, error: i, complete: o });
      }
    };
    (e.normalizeQueryParams = wn),
      (e.joinWithSlash = Ad),
      (e.stripTrailingSlash = Qm),
      (e.ɵfac = function (i) {
        return new (i || e)(b(Cn));
      }),
      (e.ɵprov = E({ token: e, factory: () => o_(), providedIn: "root" }));
    let t = e;
    return t;
  })();
function o_() {
  return new ni(b(Cn));
}
function s_(t, e) {
  if (!t || !e.startsWith(t)) return e;
  let r = e.substring(t.length);
  return r === "" || ["/", ";", "?", "#"].includes(r[0]) ? r : e;
}
function Ym(t) {
  return t.replace(/\/index.html$/, "");
}
function a_(t) {
  if (new RegExp("^(https?:)?//").test(t)) {
    let [, r] = t.split(/\/\/[^\/]+/);
    return r;
  }
  return t;
}
var Ke = (function (t) {
    return (
      (t[(t.Format = 0)] = "Format"), (t[(t.Standalone = 1)] = "Standalone"), t
    );
  })(Ke || {}),
  ue = (function (t) {
    return (
      (t[(t.Narrow = 0)] = "Narrow"),
      (t[(t.Abbreviated = 1)] = "Abbreviated"),
      (t[(t.Wide = 2)] = "Wide"),
      (t[(t.Short = 3)] = "Short"),
      t
    );
  })(ue || {}),
  ct = (function (t) {
    return (
      (t[(t.Short = 0)] = "Short"),
      (t[(t.Medium = 1)] = "Medium"),
      (t[(t.Long = 2)] = "Long"),
      (t[(t.Full = 3)] = "Full"),
      t
    );
  })(ct || {}),
  Hn = {
    Decimal: 0,
    Group: 1,
    List: 2,
    PercentSign: 3,
    PlusSign: 4,
    MinusSign: 5,
    Exponential: 6,
    SuperscriptingExponent: 7,
    PerMille: 8,
    Infinity: 9,
    NaN: 10,
    TimeSeparator: 11,
    CurrencyDecimal: 12,
    CurrencyGroup: 13,
  };
function l_(t) {
  return Dt(t)[Ee.LocaleId];
}
function c_(t, e, r) {
  let n = Dt(t),
    i = [n[Ee.DayPeriodsFormat], n[Ee.DayPeriodsStandalone]],
    o = wt(i, e);
  return wt(o, r);
}
function u_(t, e, r) {
  let n = Dt(t),
    i = [n[Ee.DaysFormat], n[Ee.DaysStandalone]],
    o = wt(i, e);
  return wt(o, r);
}
function d_(t, e, r) {
  let n = Dt(t),
    i = [n[Ee.MonthsFormat], n[Ee.MonthsStandalone]],
    o = wt(i, e);
  return wt(o, r);
}
function f_(t, e) {
  let n = Dt(t)[Ee.Eras];
  return wt(n, e);
}
function Oa(t, e) {
  let r = Dt(t);
  return wt(r[Ee.DateFormat], e);
}
function ka(t, e) {
  let r = Dt(t);
  return wt(r[Ee.TimeFormat], e);
}
function Pa(t, e) {
  let n = Dt(t)[Ee.DateTimeFormat];
  return wt(n, e);
}
function Ha(t, e) {
  let r = Dt(t),
    n = r[Ee.NumberSymbols][e];
  if (typeof n > "u") {
    if (e === Hn.CurrencyDecimal) return r[Ee.NumberSymbols][Hn.Decimal];
    if (e === Hn.CurrencyGroup) return r[Ee.NumberSymbols][Hn.Group];
  }
  return n;
}
function sy(t) {
  if (!t[Ee.ExtraData])
    throw new Error(
      `Missing extra locale data for the locale "${
        t[Ee.LocaleId]
      }". Use "registerLocaleData" to load new data. See the "I18n guide" on angular.io to know more.`
    );
}
function h_(t) {
  let e = Dt(t);
  return (
    sy(e),
    (e[Ee.ExtraData][2] || []).map((n) =>
      typeof n == "string" ? vd(n) : [vd(n[0]), vd(n[1])]
    )
  );
}
function p_(t, e, r) {
  let n = Dt(t);
  sy(n);
  let i = [n[Ee.ExtraData][0], n[Ee.ExtraData][1]],
    o = wt(i, e) || [];
  return wt(o, r) || [];
}
function wt(t, e) {
  for (let r = e; r > -1; r--) if (typeof t[r] < "u") return t[r];
  throw new Error("Locale data API: locale data undefined");
}
function vd(t) {
  let [e, r] = t.split(":");
  return { hours: +e, minutes: +r };
}
var g_ =
    /^(\d{4,})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/,
  Fa = {},
  m_ =
    /((?:[^BEGHLMOSWYZabcdhmswyz']+)|(?:'(?:[^']|'')*')|(?:G{1,5}|y{1,4}|Y{1,4}|M{1,5}|L{1,5}|w{1,2}|W{1}|d{1,2}|E{1,6}|c{1,6}|a{1,5}|b{1,5}|B{1,5}|h{1,2}|H{1,2}|m{1,2}|s{1,2}|S{1,3}|z{1,4}|Z{1,5}|O{1,4}))([\s\S]*)/,
  bn = (function (t) {
    return (
      (t[(t.Short = 0)] = "Short"),
      (t[(t.ShortGMT = 1)] = "ShortGMT"),
      (t[(t.Long = 2)] = "Long"),
      (t[(t.Extended = 3)] = "Extended"),
      t
    );
  })(bn || {}),
  X = (function (t) {
    return (
      (t[(t.FullYear = 0)] = "FullYear"),
      (t[(t.Month = 1)] = "Month"),
      (t[(t.Date = 2)] = "Date"),
      (t[(t.Hours = 3)] = "Hours"),
      (t[(t.Minutes = 4)] = "Minutes"),
      (t[(t.Seconds = 5)] = "Seconds"),
      (t[(t.FractionalSeconds = 6)] = "FractionalSeconds"),
      (t[(t.Day = 7)] = "Day"),
      t
    );
  })(X || {}),
  K = (function (t) {
    return (
      (t[(t.DayPeriods = 0)] = "DayPeriods"),
      (t[(t.Days = 1)] = "Days"),
      (t[(t.Months = 2)] = "Months"),
      (t[(t.Eras = 3)] = "Eras"),
      t
    );
  })(K || {});
function y_(t, e, r, n) {
  let i = S_(t);
  e = Dn(r, e) || e;
  let s = [],
    a;
  for (; e; )
    if (((a = m_.exec(e)), a)) {
      s = s.concat(a.slice(1));
      let u = s.pop();
      if (!u) break;
      e = u;
    } else {
      s.push(e);
      break;
    }
  let l = i.getTimezoneOffset();
  n && ((l = ly(n, l)), (i = __(i, n, !0)));
  let c = "";
  return (
    s.forEach((u) => {
      let d = E_(u);
      c += d
        ? d(i, r, l)
        : u === "''"
        ? "'"
        : u.replace(/(^'|'$)/g, "").replace(/''/g, "'");
    }),
    c
  );
}
function Ua(t, e, r) {
  let n = new Date(0);
  return n.setFullYear(t, e, r), n.setHours(0, 0, 0), n;
}
function Dn(t, e) {
  let r = l_(t);
  if (((Fa[r] ??= {}), Fa[r][e])) return Fa[r][e];
  let n = "";
  switch (e) {
    case "shortDate":
      n = Oa(t, ct.Short);
      break;
    case "mediumDate":
      n = Oa(t, ct.Medium);
      break;
    case "longDate":
      n = Oa(t, ct.Long);
      break;
    case "fullDate":
      n = Oa(t, ct.Full);
      break;
    case "shortTime":
      n = ka(t, ct.Short);
      break;
    case "mediumTime":
      n = ka(t, ct.Medium);
      break;
    case "longTime":
      n = ka(t, ct.Long);
      break;
    case "fullTime":
      n = ka(t, ct.Full);
      break;
    case "short":
      let i = Dn(t, "shortTime"),
        o = Dn(t, "shortDate");
      n = La(Pa(t, ct.Short), [i, o]);
      break;
    case "medium":
      let s = Dn(t, "mediumTime"),
        a = Dn(t, "mediumDate");
      n = La(Pa(t, ct.Medium), [s, a]);
      break;
    case "long":
      let l = Dn(t, "longTime"),
        c = Dn(t, "longDate");
      n = La(Pa(t, ct.Long), [l, c]);
      break;
    case "full":
      let u = Dn(t, "fullTime"),
        d = Dn(t, "fullDate");
      n = La(Pa(t, ct.Full), [u, d]);
      break;
  }
  return n && (Fa[r][e] = n), n;
}
function La(t, e) {
  return (
    e &&
      (t = t.replace(/\{([^}]+)}/g, function (r, n) {
        return e != null && n in e ? e[n] : r;
      })),
    t
  );
}
function Ft(t, e, r = "-", n, i) {
  let o = "";
  (t < 0 || (i && t <= 0)) && (i ? (t = -t + 1) : ((t = -t), (o = r)));
  let s = String(t);
  for (; s.length < e; ) s = "0" + s;
  return n && (s = s.slice(s.length - e)), o + s;
}
function v_(t, e) {
  return Ft(t, 3).substring(0, e);
}
function xe(t, e, r = 0, n = !1, i = !1) {
  return function (o, s) {
    let a = D_(t, o);
    if (((r > 0 || a > -r) && (a += r), t === X.Hours))
      a === 0 && r === -12 && (a = 12);
    else if (t === X.FractionalSeconds) return v_(a, e);
    let l = Ha(s, Hn.MinusSign);
    return Ft(a, e, l, n, i);
  };
}
function D_(t, e) {
  switch (t) {
    case X.FullYear:
      return e.getFullYear();
    case X.Month:
      return e.getMonth();
    case X.Date:
      return e.getDate();
    case X.Hours:
      return e.getHours();
    case X.Minutes:
      return e.getMinutes();
    case X.Seconds:
      return e.getSeconds();
    case X.FractionalSeconds:
      return e.getMilliseconds();
    case X.Day:
      return e.getDay();
    default:
      throw new Error(`Unknown DateType value "${t}".`);
  }
}
function fe(t, e, r = Ke.Format, n = !1) {
  return function (i, o) {
    return w_(i, o, t, e, r, n);
  };
}
function w_(t, e, r, n, i, o) {
  switch (r) {
    case K.Months:
      return d_(e, i, n)[t.getMonth()];
    case K.Days:
      return u_(e, i, n)[t.getDay()];
    case K.DayPeriods:
      let s = t.getHours(),
        a = t.getMinutes();
      if (o) {
        let c = h_(e),
          u = p_(e, i, n),
          d = c.findIndex((f) => {
            if (Array.isArray(f)) {
              let [g, C] = f,
                I = s >= g.hours && a >= g.minutes,
                x = s < C.hours || (s === C.hours && a < C.minutes);
              if (g.hours < C.hours) {
                if (I && x) return !0;
              } else if (I || x) return !0;
            } else if (f.hours === s && f.minutes === a) return !0;
            return !1;
          });
        if (d !== -1) return u[d];
      }
      return c_(e, i, n)[s < 12 ? 0 : 1];
    case K.Eras:
      return f_(e, n)[t.getFullYear() <= 0 ? 0 : 1];
    default:
      let l = r;
      throw new Error(`unexpected translation type ${l}`);
  }
}
function Va(t) {
  return function (e, r, n) {
    let i = -1 * n,
      o = Ha(r, Hn.MinusSign),
      s = i > 0 ? Math.floor(i / 60) : Math.ceil(i / 60);
    switch (t) {
      case bn.Short:
        return (i >= 0 ? "+" : "") + Ft(s, 2, o) + Ft(Math.abs(i % 60), 2, o);
      case bn.ShortGMT:
        return "GMT" + (i >= 0 ? "+" : "") + Ft(s, 1, o);
      case bn.Long:
        return (
          "GMT" +
          (i >= 0 ? "+" : "") +
          Ft(s, 2, o) +
          ":" +
          Ft(Math.abs(i % 60), 2, o)
        );
      case bn.Extended:
        return n === 0
          ? "Z"
          : (i >= 0 ? "+" : "") +
              Ft(s, 2, o) +
              ":" +
              Ft(Math.abs(i % 60), 2, o);
      default:
        throw new Error(`Unknown zone width "${t}"`);
    }
  };
}
var b_ = 0,
  Ba = 4;
function C_(t) {
  let e = Ua(t, b_, 1).getDay();
  return Ua(t, 0, 1 + (e <= Ba ? Ba : Ba + 7) - e);
}
function ay(t) {
  let e = t.getDay(),
    r = e === 0 ? -3 : Ba - e;
  return Ua(t.getFullYear(), t.getMonth(), t.getDate() + r);
}
function Dd(t, e = !1) {
  return function (r, n) {
    let i;
    if (e) {
      let o = new Date(r.getFullYear(), r.getMonth(), 1).getDay() - 1,
        s = r.getDate();
      i = 1 + Math.floor((s + o) / 7);
    } else {
      let o = ay(r),
        s = C_(o.getFullYear()),
        a = o.getTime() - s.getTime();
      i = 1 + Math.round(a / 6048e5);
    }
    return Ft(i, t, Ha(n, Hn.MinusSign));
  };
}
function ja(t, e = !1) {
  return function (r, n) {
    let o = ay(r).getFullYear();
    return Ft(o, t, Ha(n, Hn.MinusSign), e);
  };
}
var wd = {};
function E_(t) {
  if (wd[t]) return wd[t];
  let e;
  switch (t) {
    case "G":
    case "GG":
    case "GGG":
      e = fe(K.Eras, ue.Abbreviated);
      break;
    case "GGGG":
      e = fe(K.Eras, ue.Wide);
      break;
    case "GGGGG":
      e = fe(K.Eras, ue.Narrow);
      break;
    case "y":
      e = xe(X.FullYear, 1, 0, !1, !0);
      break;
    case "yy":
      e = xe(X.FullYear, 2, 0, !0, !0);
      break;
    case "yyy":
      e = xe(X.FullYear, 3, 0, !1, !0);
      break;
    case "yyyy":
      e = xe(X.FullYear, 4, 0, !1, !0);
      break;
    case "Y":
      e = ja(1);
      break;
    case "YY":
      e = ja(2, !0);
      break;
    case "YYY":
      e = ja(3);
      break;
    case "YYYY":
      e = ja(4);
      break;
    case "M":
    case "L":
      e = xe(X.Month, 1, 1);
      break;
    case "MM":
    case "LL":
      e = xe(X.Month, 2, 1);
      break;
    case "MMM":
      e = fe(K.Months, ue.Abbreviated);
      break;
    case "MMMM":
      e = fe(K.Months, ue.Wide);
      break;
    case "MMMMM":
      e = fe(K.Months, ue.Narrow);
      break;
    case "LLL":
      e = fe(K.Months, ue.Abbreviated, Ke.Standalone);
      break;
    case "LLLL":
      e = fe(K.Months, ue.Wide, Ke.Standalone);
      break;
    case "LLLLL":
      e = fe(K.Months, ue.Narrow, Ke.Standalone);
      break;
    case "w":
      e = Dd(1);
      break;
    case "ww":
      e = Dd(2);
      break;
    case "W":
      e = Dd(1, !0);
      break;
    case "d":
      e = xe(X.Date, 1);
      break;
    case "dd":
      e = xe(X.Date, 2);
      break;
    case "c":
    case "cc":
      e = xe(X.Day, 1);
      break;
    case "ccc":
      e = fe(K.Days, ue.Abbreviated, Ke.Standalone);
      break;
    case "cccc":
      e = fe(K.Days, ue.Wide, Ke.Standalone);
      break;
    case "ccccc":
      e = fe(K.Days, ue.Narrow, Ke.Standalone);
      break;
    case "cccccc":
      e = fe(K.Days, ue.Short, Ke.Standalone);
      break;
    case "E":
    case "EE":
    case "EEE":
      e = fe(K.Days, ue.Abbreviated);
      break;
    case "EEEE":
      e = fe(K.Days, ue.Wide);
      break;
    case "EEEEE":
      e = fe(K.Days, ue.Narrow);
      break;
    case "EEEEEE":
      e = fe(K.Days, ue.Short);
      break;
    case "a":
    case "aa":
    case "aaa":
      e = fe(K.DayPeriods, ue.Abbreviated);
      break;
    case "aaaa":
      e = fe(K.DayPeriods, ue.Wide);
      break;
    case "aaaaa":
      e = fe(K.DayPeriods, ue.Narrow);
      break;
    case "b":
    case "bb":
    case "bbb":
      e = fe(K.DayPeriods, ue.Abbreviated, Ke.Standalone, !0);
      break;
    case "bbbb":
      e = fe(K.DayPeriods, ue.Wide, Ke.Standalone, !0);
      break;
    case "bbbbb":
      e = fe(K.DayPeriods, ue.Narrow, Ke.Standalone, !0);
      break;
    case "B":
    case "BB":
    case "BBB":
      e = fe(K.DayPeriods, ue.Abbreviated, Ke.Format, !0);
      break;
    case "BBBB":
      e = fe(K.DayPeriods, ue.Wide, Ke.Format, !0);
      break;
    case "BBBBB":
      e = fe(K.DayPeriods, ue.Narrow, Ke.Format, !0);
      break;
    case "h":
      e = xe(X.Hours, 1, -12);
      break;
    case "hh":
      e = xe(X.Hours, 2, -12);
      break;
    case "H":
      e = xe(X.Hours, 1);
      break;
    case "HH":
      e = xe(X.Hours, 2);
      break;
    case "m":
      e = xe(X.Minutes, 1);
      break;
    case "mm":
      e = xe(X.Minutes, 2);
      break;
    case "s":
      e = xe(X.Seconds, 1);
      break;
    case "ss":
      e = xe(X.Seconds, 2);
      break;
    case "S":
      e = xe(X.FractionalSeconds, 1);
      break;
    case "SS":
      e = xe(X.FractionalSeconds, 2);
      break;
    case "SSS":
      e = xe(X.FractionalSeconds, 3);
      break;
    case "Z":
    case "ZZ":
    case "ZZZ":
      e = Va(bn.Short);
      break;
    case "ZZZZZ":
      e = Va(bn.Extended);
      break;
    case "O":
    case "OO":
    case "OOO":
    case "z":
    case "zz":
    case "zzz":
      e = Va(bn.ShortGMT);
      break;
    case "OOOO":
    case "ZZZZ":
    case "zzzz":
      e = Va(bn.Long);
      break;
    default:
      return null;
  }
  return (wd[t] = e), e;
}
function ly(t, e) {
  t = t.replace(/:/g, "");
  let r = Date.parse("Jan 01, 1970 00:00:00 " + t) / 6e4;
  return isNaN(r) ? e : r;
}
function I_(t, e) {
  return (t = new Date(t.getTime())), t.setMinutes(t.getMinutes() + e), t;
}
function __(t, e, r) {
  let n = r ? -1 : 1,
    i = t.getTimezoneOffset(),
    o = ly(e, i);
  return I_(t, n * (o - i));
}
function S_(t) {
  if (Km(t)) return t;
  if (typeof t == "number" && !isNaN(t)) return new Date(t);
  if (typeof t == "string") {
    if (((t = t.trim()), /^(\d{4}(-\d{1,2}(-\d{1,2})?)?)$/.test(t))) {
      let [i, o = 1, s = 1] = t.split("-").map((a) => +a);
      return Ua(i, o - 1, s);
    }
    let r = parseFloat(t);
    if (!isNaN(t - r)) return new Date(r);
    let n;
    if ((n = t.match(g_))) return M_(n);
  }
  let e = new Date(t);
  if (!Km(e)) throw new Error(`Unable to convert "${t}" into a date`);
  return e;
}
function M_(t) {
  let e = new Date(0),
    r = 0,
    n = 0,
    i = t[8] ? e.setUTCFullYear : e.setFullYear,
    o = t[8] ? e.setUTCHours : e.setHours;
  t[9] && ((r = Number(t[9] + t[10])), (n = Number(t[9] + t[11]))),
    i.call(e, Number(t[1]), Number(t[2]) - 1, Number(t[3]));
  let s = Number(t[4] || 0) - r,
    a = Number(t[5] || 0) - n,
    l = Number(t[6] || 0),
    c = Math.floor(parseFloat("0." + (t[7] || 0)) * 1e3);
  return o.call(e, s, a, l, c), e;
}
function Km(t) {
  return t instanceof Date && !isNaN(t.valueOf());
}
function za(t, e) {
  e = encodeURIComponent(e);
  for (let r of t.split(";")) {
    let n = r.indexOf("="),
      [i, o] = n == -1 ? [r, ""] : [r.slice(0, n), r.slice(n + 1)];
    if (i.trim() === e) return decodeURIComponent(o);
  }
  return null;
}
var bd = /\s+/,
  Xm = [],
  Wa = (() => {
    let e = class e {
      constructor(n, i) {
        (this._ngEl = n),
          (this._renderer = i),
          (this.initialClasses = Xm),
          (this.stateMap = new Map());
      }
      set klass(n) {
        this.initialClasses = n != null ? n.trim().split(bd) : Xm;
      }
      set ngClass(n) {
        this.rawClass = typeof n == "string" ? n.trim().split(bd) : n;
      }
      ngDoCheck() {
        for (let i of this.initialClasses) this._updateState(i, !0);
        let n = this.rawClass;
        if (Array.isArray(n) || n instanceof Set)
          for (let i of n) this._updateState(i, !0);
        else if (n != null)
          for (let i of Object.keys(n)) this._updateState(i, !!n[i]);
        this._applyStateDiff();
      }
      _updateState(n, i) {
        let o = this.stateMap.get(n);
        o !== void 0
          ? (o.enabled !== i && ((o.changed = !0), (o.enabled = i)),
            (o.touched = !0))
          : this.stateMap.set(n, { enabled: i, changed: !0, touched: !0 });
      }
      _applyStateDiff() {
        for (let n of this.stateMap) {
          let i = n[0],
            o = n[1];
          o.changed
            ? (this._toggleClass(i, o.enabled), (o.changed = !1))
            : o.touched ||
              (o.enabled && this._toggleClass(i, !1), this.stateMap.delete(i)),
            (o.touched = !1);
        }
      }
      _toggleClass(n, i) {
        (n = n.trim()),
          n.length > 0 &&
            n.split(bd).forEach((o) => {
              i
                ? this._renderer.addClass(this._ngEl.nativeElement, o)
                : this._renderer.removeClass(this._ngEl.nativeElement, o);
            });
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w($e), w(qt));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [["", "ngClass", ""]],
        inputs: { klass: [Fe.None, "class", "klass"], ngClass: "ngClass" },
        standalone: !0,
      }));
    let t = e;
    return t;
  })();
var Cd = class {
    constructor(e, r, n, i) {
      (this.$implicit = e),
        (this.ngForOf = r),
        (this.index = n),
        (this.count = i);
    }
    get first() {
      return this.index === 0;
    }
    get last() {
      return this.index === this.count - 1;
    }
    get even() {
      return this.index % 2 === 0;
    }
    get odd() {
      return !this.even;
    }
  },
  it = (() => {
    let e = class e {
      set ngForOf(n) {
        (this._ngForOf = n), (this._ngForOfDirty = !0);
      }
      set ngForTrackBy(n) {
        this._trackByFn = n;
      }
      get ngForTrackBy() {
        return this._trackByFn;
      }
      constructor(n, i, o) {
        (this._viewContainer = n),
          (this._template = i),
          (this._differs = o),
          (this._ngForOf = null),
          (this._ngForOfDirty = !0),
          (this._differ = null);
      }
      set ngForTemplate(n) {
        n && (this._template = n);
      }
      ngDoCheck() {
        if (this._ngForOfDirty) {
          this._ngForOfDirty = !1;
          let n = this._ngForOf;
          if (!this._differ && n)
            if (0)
              try {
              } catch {}
            else this._differ = this._differs.find(n).create(this.ngForTrackBy);
        }
        if (this._differ) {
          let n = this._differ.diff(this._ngForOf);
          n && this._applyChanges(n);
        }
      }
      _applyChanges(n) {
        let i = this._viewContainer;
        n.forEachOperation((o, s, a) => {
          if (o.previousIndex == null)
            i.createEmbeddedView(
              this._template,
              new Cd(o.item, this._ngForOf, -1, -1),
              a === null ? void 0 : a
            );
          else if (a == null) i.remove(s === null ? void 0 : s);
          else if (s !== null) {
            let l = i.get(s);
            i.move(l, a), Jm(l, o);
          }
        });
        for (let o = 0, s = i.length; o < s; o++) {
          let l = i.get(o).context;
          (l.index = o), (l.count = s), (l.ngForOf = this._ngForOf);
        }
        n.forEachIdentityChange((o) => {
          let s = i.get(o.currentIndex);
          Jm(s, o);
        });
      }
      static ngTemplateContextGuard(n, i) {
        return !0;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(Zt), w(ur), w(md));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [["", "ngFor", "", "ngForOf", ""]],
        inputs: {
          ngForOf: "ngForOf",
          ngForTrackBy: "ngForTrackBy",
          ngForTemplate: "ngForTemplate",
        },
        standalone: !0,
      }));
    let t = e;
    return t;
  })();
function Jm(t, e) {
  t.context.$implicit = e.item;
}
var Oe = (() => {
    let e = class e {
      constructor(n, i) {
        (this._viewContainer = n),
          (this._context = new Ed()),
          (this._thenTemplateRef = null),
          (this._elseTemplateRef = null),
          (this._thenViewRef = null),
          (this._elseViewRef = null),
          (this._thenTemplateRef = i);
      }
      set ngIf(n) {
        (this._context.$implicit = this._context.ngIf = n), this._updateView();
      }
      set ngIfThen(n) {
        ey("ngIfThen", n),
          (this._thenTemplateRef = n),
          (this._thenViewRef = null),
          this._updateView();
      }
      set ngIfElse(n) {
        ey("ngIfElse", n),
          (this._elseTemplateRef = n),
          (this._elseViewRef = null),
          this._updateView();
      }
      _updateView() {
        this._context.$implicit
          ? this._thenViewRef ||
            (this._viewContainer.clear(),
            (this._elseViewRef = null),
            this._thenTemplateRef &&
              (this._thenViewRef = this._viewContainer.createEmbeddedView(
                this._thenTemplateRef,
                this._context
              )))
          : this._elseViewRef ||
            (this._viewContainer.clear(),
            (this._thenViewRef = null),
            this._elseTemplateRef &&
              (this._elseViewRef = this._viewContainer.createEmbeddedView(
                this._elseTemplateRef,
                this._context
              )));
      }
      static ngTemplateContextGuard(n, i) {
        return !0;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(Zt), w(ur));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [["", "ngIf", ""]],
        inputs: { ngIf: "ngIf", ngIfThen: "ngIfThen", ngIfElse: "ngIfElse" },
        standalone: !0,
      }));
    let t = e;
    return t;
  })(),
  Ed = class {
    constructor() {
      (this.$implicit = null), (this.ngIf = null);
    }
  };
function ey(t, e) {
  if (!!!(!e || e.createEmbeddedView))
    throw new Error(`${t} must be a TemplateRef, but received '${Ze(e)}'.`);
}
function cy(t, e) {
  return new _(2100, !1);
}
var Id = class {
    createSubscription(e, r) {
      return yd(() =>
        e.subscribe({
          next: r,
          error: (n) => {
            throw n;
          },
        })
      );
    }
    dispose(e) {
      yd(() => e.unsubscribe());
    }
  },
  _d = class {
    createSubscription(e, r) {
      return e.then(r, (n) => {
        throw n;
      });
    }
    dispose(e) {}
  },
  x_ = new _d(),
  T_ = new Id(),
  ze = (() => {
    let e = class e {
      constructor(n) {
        (this._latestValue = null),
          (this.markForCheckOnValueUpdate = !0),
          (this._subscription = null),
          (this._obj = null),
          (this._strategy = null),
          (this._ref = n);
      }
      ngOnDestroy() {
        this._subscription && this._dispose(), (this._ref = null);
      }
      transform(n) {
        if (!this._obj) {
          if (n)
            try {
              (this.markForCheckOnValueUpdate = !1), this._subscribe(n);
            } finally {
              this.markForCheckOnValueUpdate = !0;
            }
          return this._latestValue;
        }
        return n !== this._obj
          ? (this._dispose(), this.transform(n))
          : this._latestValue;
      }
      _subscribe(n) {
        (this._obj = n),
          (this._strategy = this._selectStrategy(n)),
          (this._subscription = this._strategy.createSubscription(n, (i) =>
            this._updateLatestValue(n, i)
          ));
      }
      _selectStrategy(n) {
        if ($n(n)) return x_;
        if (pd(n)) return T_;
        throw cy(e, n);
      }
      _dispose() {
        this._strategy.dispose(this._subscription),
          (this._latestValue = null),
          (this._subscription = null),
          (this._obj = null);
      }
      _updateLatestValue(n, i) {
        n === this._obj &&
          ((this._latestValue = i),
          this.markForCheckOnValueUpdate && this._ref?.markForCheck());
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(Un, 16));
    }),
      (e.ɵpipe = ea({ name: "async", type: e, pure: !1, standalone: !0 }));
    let t = e;
    return t;
  })();
var A_ = "mediumDate",
  N_ = new S(""),
  R_ = new S(""),
  ri = (() => {
    let e = class e {
      constructor(n, i, o) {
        (this.locale = n),
          (this.defaultTimezone = i),
          (this.defaultOptions = o);
      }
      transform(n, i, o, s) {
        if (n == null || n === "" || n !== n) return null;
        try {
          let a = i ?? this.defaultOptions?.dateFormat ?? A_,
            l =
              o ??
              this.defaultOptions?.timezone ??
              this.defaultTimezone ??
              void 0;
          return y_(n, a, s || this.locale, l);
        } catch (a) {
          throw cy(e, a.message);
        }
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(Ra, 16), w(N_, 24), w(R_, 24));
    }),
      (e.ɵpipe = ea({ name: "date", type: e, pure: !0, standalone: !0 }));
    let t = e;
    return t;
  })();
var Ga = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵmod = Re({ type: e })),
      (e.ɵinj = Ne({}));
    let t = e;
    return t;
  })(),
  Rd = "browser",
  O_ = "server";
function Kt(t) {
  return t === Rd;
}
function qa(t) {
  return t === O_;
}
var uy = (() => {
    let e = class e {};
    e.ɵprov = E({
      token: e,
      providedIn: "root",
      factory: () => (Kt(D(rt)) ? new Sd(D(Te), window) : new Md()),
    });
    let t = e;
    return t;
  })(),
  Sd = class {
    constructor(e, r) {
      (this.document = e), (this.window = r), (this.offset = () => [0, 0]);
    }
    setOffset(e) {
      Array.isArray(e) ? (this.offset = () => e) : (this.offset = e);
    }
    getScrollPosition() {
      return [this.window.scrollX, this.window.scrollY];
    }
    scrollToPosition(e) {
      this.window.scrollTo(e[0], e[1]);
    }
    scrollToAnchor(e) {
      let r = k_(this.document, e);
      r && (this.scrollToElement(r), r.focus());
    }
    setHistoryScrollRestoration(e) {
      this.window.history.scrollRestoration = e;
    }
    scrollToElement(e) {
      let r = e.getBoundingClientRect(),
        n = r.left + this.window.pageXOffset,
        i = r.top + this.window.pageYOffset,
        o = this.offset();
      this.window.scrollTo(n - o[0], i - o[1]);
    }
  };
function k_(t, e) {
  let r = t.getElementById(e) || t.getElementsByName(e)[0];
  if (r) return r;
  if (
    typeof t.createTreeWalker == "function" &&
    t.body &&
    typeof t.body.attachShadow == "function"
  ) {
    let n = t.createTreeWalker(t.body, NodeFilter.SHOW_ELEMENT),
      i = n.currentNode;
    for (; i; ) {
      let o = i.shadowRoot;
      if (o) {
        let s = o.getElementById(e) || o.querySelector(`[name="${e}"]`);
        if (s) return s;
      }
      i = n.nextNode();
    }
  }
  return null;
}
var Md = class {
    setOffset(e) {}
    getScrollPosition() {
      return [0, 0];
    }
    scrollToPosition(e) {}
    scrollToAnchor(e) {}
    setHistoryScrollRestoration(e) {}
  },
  ti = class {};
var Xi = class {},
  Qa = class {},
  yr = class t {
    constructor(e) {
      (this.normalizedNames = new Map()),
        (this.lazyUpdate = null),
        e
          ? typeof e == "string"
            ? (this.lazyInit = () => {
                (this.headers = new Map()),
                  e
                    .split(
                      `
`
                    )
                    .forEach((r) => {
                      let n = r.indexOf(":");
                      if (n > 0) {
                        let i = r.slice(0, n),
                          o = i.toLowerCase(),
                          s = r.slice(n + 1).trim();
                        this.maybeSetNormalizedName(i, o),
                          this.headers.has(o)
                            ? this.headers.get(o).push(s)
                            : this.headers.set(o, [s]);
                      }
                    });
              })
            : typeof Headers < "u" && e instanceof Headers
            ? ((this.headers = new Map()),
              e.forEach((r, n) => {
                this.setHeaderEntries(n, r);
              }))
            : (this.lazyInit = () => {
                (this.headers = new Map()),
                  Object.entries(e).forEach(([r, n]) => {
                    this.setHeaderEntries(r, n);
                  });
              })
          : (this.headers = new Map());
    }
    has(e) {
      return this.init(), this.headers.has(e.toLowerCase());
    }
    get(e) {
      this.init();
      let r = this.headers.get(e.toLowerCase());
      return r && r.length > 0 ? r[0] : null;
    }
    keys() {
      return this.init(), Array.from(this.normalizedNames.values());
    }
    getAll(e) {
      return this.init(), this.headers.get(e.toLowerCase()) || null;
    }
    append(e, r) {
      return this.clone({ name: e, value: r, op: "a" });
    }
    set(e, r) {
      return this.clone({ name: e, value: r, op: "s" });
    }
    delete(e, r) {
      return this.clone({ name: e, value: r, op: "d" });
    }
    maybeSetNormalizedName(e, r) {
      this.normalizedNames.has(r) || this.normalizedNames.set(r, e);
    }
    init() {
      this.lazyInit &&
        (this.lazyInit instanceof t
          ? this.copyFrom(this.lazyInit)
          : this.lazyInit(),
        (this.lazyInit = null),
        this.lazyUpdate &&
          (this.lazyUpdate.forEach((e) => this.applyUpdate(e)),
          (this.lazyUpdate = null)));
    }
    copyFrom(e) {
      e.init(),
        Array.from(e.headers.keys()).forEach((r) => {
          this.headers.set(r, e.headers.get(r)),
            this.normalizedNames.set(r, e.normalizedNames.get(r));
        });
    }
    clone(e) {
      let r = new t();
      return (
        (r.lazyInit =
          this.lazyInit && this.lazyInit instanceof t ? this.lazyInit : this),
        (r.lazyUpdate = (this.lazyUpdate || []).concat([e])),
        r
      );
    }
    applyUpdate(e) {
      let r = e.name.toLowerCase();
      switch (e.op) {
        case "a":
        case "s":
          let n = e.value;
          if ((typeof n == "string" && (n = [n]), n.length === 0)) return;
          this.maybeSetNormalizedName(e.name, r);
          let i = (e.op === "a" ? this.headers.get(r) : void 0) || [];
          i.push(...n), this.headers.set(r, i);
          break;
        case "d":
          let o = e.value;
          if (!o) this.headers.delete(r), this.normalizedNames.delete(r);
          else {
            let s = this.headers.get(r);
            if (!s) return;
            (s = s.filter((a) => o.indexOf(a) === -1)),
              s.length === 0
                ? (this.headers.delete(r), this.normalizedNames.delete(r))
                : this.headers.set(r, s);
          }
          break;
      }
    }
    setHeaderEntries(e, r) {
      let n = (Array.isArray(r) ? r : [r]).map((o) => o.toString()),
        i = e.toLowerCase();
      this.headers.set(i, n), this.maybeSetNormalizedName(e, i);
    }
    forEach(e) {
      this.init(),
        Array.from(this.normalizedNames.keys()).forEach((r) =>
          e(this.normalizedNames.get(r), this.headers.get(r))
        );
    }
  };
var kd = class {
  encodeKey(e) {
    return dy(e);
  }
  encodeValue(e) {
    return dy(e);
  }
  decodeKey(e) {
    return decodeURIComponent(e);
  }
  decodeValue(e) {
    return decodeURIComponent(e);
  }
};
function L_(t, e) {
  let r = new Map();
  return (
    t.length > 0 &&
      t
        .replace(/^\?/, "")
        .split("&")
        .forEach((i) => {
          let o = i.indexOf("="),
            [s, a] =
              o == -1
                ? [e.decodeKey(i), ""]
                : [e.decodeKey(i.slice(0, o)), e.decodeValue(i.slice(o + 1))],
            l = r.get(s) || [];
          l.push(a), r.set(s, l);
        }),
    r
  );
}
var V_ = /%(\d[a-f0-9])/gi,
  j_ = {
    40: "@",
    "3A": ":",
    24: "$",
    "2C": ",",
    "3B": ";",
    "3D": "=",
    "3F": "?",
    "2F": "/",
  };
function dy(t) {
  return encodeURIComponent(t).replace(V_, (e, r) => j_[r] ?? e);
}
function Za(t) {
  return `${t}`;
}
var zn = class t {
  constructor(e = {}) {
    if (
      ((this.updates = null),
      (this.cloneFrom = null),
      (this.encoder = e.encoder || new kd()),
      e.fromString)
    ) {
      if (e.fromObject)
        throw new Error("Cannot specify both fromString and fromObject.");
      this.map = L_(e.fromString, this.encoder);
    } else
      e.fromObject
        ? ((this.map = new Map()),
          Object.keys(e.fromObject).forEach((r) => {
            let n = e.fromObject[r],
              i = Array.isArray(n) ? n.map(Za) : [Za(n)];
            this.map.set(r, i);
          }))
        : (this.map = null);
  }
  has(e) {
    return this.init(), this.map.has(e);
  }
  get(e) {
    this.init();
    let r = this.map.get(e);
    return r ? r[0] : null;
  }
  getAll(e) {
    return this.init(), this.map.get(e) || null;
  }
  keys() {
    return this.init(), Array.from(this.map.keys());
  }
  append(e, r) {
    return this.clone({ param: e, value: r, op: "a" });
  }
  appendAll(e) {
    let r = [];
    return (
      Object.keys(e).forEach((n) => {
        let i = e[n];
        Array.isArray(i)
          ? i.forEach((o) => {
              r.push({ param: n, value: o, op: "a" });
            })
          : r.push({ param: n, value: i, op: "a" });
      }),
      this.clone(r)
    );
  }
  set(e, r) {
    return this.clone({ param: e, value: r, op: "s" });
  }
  delete(e, r) {
    return this.clone({ param: e, value: r, op: "d" });
  }
  toString() {
    return (
      this.init(),
      this.keys()
        .map((e) => {
          let r = this.encoder.encodeKey(e);
          return this.map
            .get(e)
            .map((n) => r + "=" + this.encoder.encodeValue(n))
            .join("&");
        })
        .filter((e) => e !== "")
        .join("&")
    );
  }
  clone(e) {
    let r = new t({ encoder: this.encoder });
    return (
      (r.cloneFrom = this.cloneFrom || this),
      (r.updates = (this.updates || []).concat(e)),
      r
    );
  }
  init() {
    this.map === null && (this.map = new Map()),
      this.cloneFrom !== null &&
        (this.cloneFrom.init(),
        this.cloneFrom
          .keys()
          .forEach((e) => this.map.set(e, this.cloneFrom.map.get(e))),
        this.updates.forEach((e) => {
          switch (e.op) {
            case "a":
            case "s":
              let r = (e.op === "a" ? this.map.get(e.param) : void 0) || [];
              r.push(Za(e.value)), this.map.set(e.param, r);
              break;
            case "d":
              if (e.value !== void 0) {
                let n = this.map.get(e.param) || [],
                  i = n.indexOf(Za(e.value));
                i !== -1 && n.splice(i, 1),
                  n.length > 0
                    ? this.map.set(e.param, n)
                    : this.map.delete(e.param);
              } else {
                this.map.delete(e.param);
                break;
              }
          }
        }),
        (this.cloneFrom = this.updates = null));
  }
};
var Pd = class {
  constructor() {
    this.map = new Map();
  }
  set(e, r) {
    return this.map.set(e, r), this;
  }
  get(e) {
    return (
      this.map.has(e) || this.map.set(e, e.defaultValue()), this.map.get(e)
    );
  }
  delete(e) {
    return this.map.delete(e), this;
  }
  has(e) {
    return this.map.has(e);
  }
  keys() {
    return this.map.keys();
  }
};
function B_(t) {
  switch (t) {
    case "DELETE":
    case "GET":
    case "HEAD":
    case "OPTIONS":
    case "JSONP":
      return !1;
    default:
      return !0;
  }
}
function fy(t) {
  return typeof ArrayBuffer < "u" && t instanceof ArrayBuffer;
}
function hy(t) {
  return typeof Blob < "u" && t instanceof Blob;
}
function py(t) {
  return typeof FormData < "u" && t instanceof FormData;
}
function $_(t) {
  return typeof URLSearchParams < "u" && t instanceof URLSearchParams;
}
var Ki = class t {
    constructor(e, r, n, i) {
      (this.url = r),
        (this.body = null),
        (this.reportProgress = !1),
        (this.withCredentials = !1),
        (this.responseType = "json"),
        (this.method = e.toUpperCase());
      let o;
      if (
        (B_(this.method) || i
          ? ((this.body = n !== void 0 ? n : null), (o = i))
          : (o = n),
        o &&
          ((this.reportProgress = !!o.reportProgress),
          (this.withCredentials = !!o.withCredentials),
          o.responseType && (this.responseType = o.responseType),
          o.headers && (this.headers = o.headers),
          o.context && (this.context = o.context),
          o.params && (this.params = o.params),
          (this.transferCache = o.transferCache)),
        (this.headers ??= new yr()),
        (this.context ??= new Pd()),
        !this.params)
      )
        (this.params = new zn()), (this.urlWithParams = r);
      else {
        let s = this.params.toString();
        if (s.length === 0) this.urlWithParams = r;
        else {
          let a = r.indexOf("?"),
            l = a === -1 ? "?" : a < r.length - 1 ? "&" : "";
          this.urlWithParams = r + l + s;
        }
      }
    }
    serializeBody() {
      return this.body === null
        ? null
        : typeof this.body == "string" ||
          fy(this.body) ||
          hy(this.body) ||
          py(this.body) ||
          $_(this.body)
        ? this.body
        : this.body instanceof zn
        ? this.body.toString()
        : typeof this.body == "object" ||
          typeof this.body == "boolean" ||
          Array.isArray(this.body)
        ? JSON.stringify(this.body)
        : this.body.toString();
    }
    detectContentTypeHeader() {
      return this.body === null || py(this.body)
        ? null
        : hy(this.body)
        ? this.body.type || null
        : fy(this.body)
        ? null
        : typeof this.body == "string"
        ? "text/plain"
        : this.body instanceof zn
        ? "application/x-www-form-urlencoded;charset=UTF-8"
        : typeof this.body == "object" ||
          typeof this.body == "number" ||
          typeof this.body == "boolean"
        ? "application/json"
        : null;
    }
    clone(e = {}) {
      let r = e.method || this.method,
        n = e.url || this.url,
        i = e.responseType || this.responseType,
        o = e.transferCache ?? this.transferCache,
        s = e.body !== void 0 ? e.body : this.body,
        a = e.withCredentials ?? this.withCredentials,
        l = e.reportProgress ?? this.reportProgress,
        c = e.headers || this.headers,
        u = e.params || this.params,
        d = e.context ?? this.context;
      return (
        e.setHeaders !== void 0 &&
          (c = Object.keys(e.setHeaders).reduce(
            (f, g) => f.set(g, e.setHeaders[g]),
            c
          )),
        e.setParams &&
          (u = Object.keys(e.setParams).reduce(
            (f, g) => f.set(g, e.setParams[g]),
            u
          )),
        new t(r, n, s, {
          params: u,
          headers: c,
          context: d,
          reportProgress: l,
          responseType: i,
          withCredentials: a,
          transferCache: o,
        })
      );
    }
  },
  ii = (function (t) {
    return (
      (t[(t.Sent = 0)] = "Sent"),
      (t[(t.UploadProgress = 1)] = "UploadProgress"),
      (t[(t.ResponseHeader = 2)] = "ResponseHeader"),
      (t[(t.DownloadProgress = 3)] = "DownloadProgress"),
      (t[(t.Response = 4)] = "Response"),
      (t[(t.User = 5)] = "User"),
      t
    );
  })(ii || {}),
  Ji = class {
    constructor(e, r = Xa.Ok, n = "OK") {
      (this.headers = e.headers || new yr()),
        (this.status = e.status !== void 0 ? e.status : r),
        (this.statusText = e.statusText || n),
        (this.url = e.url || null),
        (this.ok = this.status >= 200 && this.status < 300);
    }
  },
  Fd = class t extends Ji {
    constructor(e = {}) {
      super(e), (this.type = ii.ResponseHeader);
    }
    clone(e = {}) {
      return new t({
        headers: e.headers || this.headers,
        status: e.status !== void 0 ? e.status : this.status,
        statusText: e.statusText || this.statusText,
        url: e.url || this.url || void 0,
      });
    }
  },
  Ya = class t extends Ji {
    constructor(e = {}) {
      super(e),
        (this.type = ii.Response),
        (this.body = e.body !== void 0 ? e.body : null);
    }
    clone(e = {}) {
      return new t({
        body: e.body !== void 0 ? e.body : this.body,
        headers: e.headers || this.headers,
        status: e.status !== void 0 ? e.status : this.status,
        statusText: e.statusText || this.statusText,
        url: e.url || this.url || void 0,
      });
    }
  },
  Ka = class extends Ji {
    constructor(e) {
      super(e, 0, "Unknown Error"),
        (this.name = "HttpErrorResponse"),
        (this.ok = !1),
        this.status >= 200 && this.status < 300
          ? (this.message = `Http failure during parsing for ${
              e.url || "(unknown url)"
            }`)
          : (this.message = `Http failure response for ${
              e.url || "(unknown url)"
            }: ${e.status} ${e.statusText}`),
        (this.error = e.error || null);
    }
  },
  Xa = (function (t) {
    return (
      (t[(t.Continue = 100)] = "Continue"),
      (t[(t.SwitchingProtocols = 101)] = "SwitchingProtocols"),
      (t[(t.Processing = 102)] = "Processing"),
      (t[(t.EarlyHints = 103)] = "EarlyHints"),
      (t[(t.Ok = 200)] = "Ok"),
      (t[(t.Created = 201)] = "Created"),
      (t[(t.Accepted = 202)] = "Accepted"),
      (t[(t.NonAuthoritativeInformation = 203)] =
        "NonAuthoritativeInformation"),
      (t[(t.NoContent = 204)] = "NoContent"),
      (t[(t.ResetContent = 205)] = "ResetContent"),
      (t[(t.PartialContent = 206)] = "PartialContent"),
      (t[(t.MultiStatus = 207)] = "MultiStatus"),
      (t[(t.AlreadyReported = 208)] = "AlreadyReported"),
      (t[(t.ImUsed = 226)] = "ImUsed"),
      (t[(t.MultipleChoices = 300)] = "MultipleChoices"),
      (t[(t.MovedPermanently = 301)] = "MovedPermanently"),
      (t[(t.Found = 302)] = "Found"),
      (t[(t.SeeOther = 303)] = "SeeOther"),
      (t[(t.NotModified = 304)] = "NotModified"),
      (t[(t.UseProxy = 305)] = "UseProxy"),
      (t[(t.Unused = 306)] = "Unused"),
      (t[(t.TemporaryRedirect = 307)] = "TemporaryRedirect"),
      (t[(t.PermanentRedirect = 308)] = "PermanentRedirect"),
      (t[(t.BadRequest = 400)] = "BadRequest"),
      (t[(t.Unauthorized = 401)] = "Unauthorized"),
      (t[(t.PaymentRequired = 402)] = "PaymentRequired"),
      (t[(t.Forbidden = 403)] = "Forbidden"),
      (t[(t.NotFound = 404)] = "NotFound"),
      (t[(t.MethodNotAllowed = 405)] = "MethodNotAllowed"),
      (t[(t.NotAcceptable = 406)] = "NotAcceptable"),
      (t[(t.ProxyAuthenticationRequired = 407)] =
        "ProxyAuthenticationRequired"),
      (t[(t.RequestTimeout = 408)] = "RequestTimeout"),
      (t[(t.Conflict = 409)] = "Conflict"),
      (t[(t.Gone = 410)] = "Gone"),
      (t[(t.LengthRequired = 411)] = "LengthRequired"),
      (t[(t.PreconditionFailed = 412)] = "PreconditionFailed"),
      (t[(t.PayloadTooLarge = 413)] = "PayloadTooLarge"),
      (t[(t.UriTooLong = 414)] = "UriTooLong"),
      (t[(t.UnsupportedMediaType = 415)] = "UnsupportedMediaType"),
      (t[(t.RangeNotSatisfiable = 416)] = "RangeNotSatisfiable"),
      (t[(t.ExpectationFailed = 417)] = "ExpectationFailed"),
      (t[(t.ImATeapot = 418)] = "ImATeapot"),
      (t[(t.MisdirectedRequest = 421)] = "MisdirectedRequest"),
      (t[(t.UnprocessableEntity = 422)] = "UnprocessableEntity"),
      (t[(t.Locked = 423)] = "Locked"),
      (t[(t.FailedDependency = 424)] = "FailedDependency"),
      (t[(t.TooEarly = 425)] = "TooEarly"),
      (t[(t.UpgradeRequired = 426)] = "UpgradeRequired"),
      (t[(t.PreconditionRequired = 428)] = "PreconditionRequired"),
      (t[(t.TooManyRequests = 429)] = "TooManyRequests"),
      (t[(t.RequestHeaderFieldsTooLarge = 431)] =
        "RequestHeaderFieldsTooLarge"),
      (t[(t.UnavailableForLegalReasons = 451)] = "UnavailableForLegalReasons"),
      (t[(t.InternalServerError = 500)] = "InternalServerError"),
      (t[(t.NotImplemented = 501)] = "NotImplemented"),
      (t[(t.BadGateway = 502)] = "BadGateway"),
      (t[(t.ServiceUnavailable = 503)] = "ServiceUnavailable"),
      (t[(t.GatewayTimeout = 504)] = "GatewayTimeout"),
      (t[(t.HttpVersionNotSupported = 505)] = "HttpVersionNotSupported"),
      (t[(t.VariantAlsoNegotiates = 506)] = "VariantAlsoNegotiates"),
      (t[(t.InsufficientStorage = 507)] = "InsufficientStorage"),
      (t[(t.LoopDetected = 508)] = "LoopDetected"),
      (t[(t.NotExtended = 510)] = "NotExtended"),
      (t[(t.NetworkAuthenticationRequired = 511)] =
        "NetworkAuthenticationRequired"),
      t
    );
  })(Xa || {});
function Od(t, e) {
  return {
    body: e,
    headers: t.headers,
    context: t.context,
    observe: t.observe,
    params: t.params,
    reportProgress: t.reportProgress,
    responseType: t.responseType,
    withCredentials: t.withCredentials,
    transferCache: t.transferCache,
  };
}
var Vt = (() => {
  let e = class e {
    constructor(n) {
      this.handler = n;
    }
    request(n, i, o = {}) {
      let s;
      if (n instanceof Ki) s = n;
      else {
        let c;
        o.headers instanceof yr ? (c = o.headers) : (c = new yr(o.headers));
        let u;
        o.params &&
          (o.params instanceof zn
            ? (u = o.params)
            : (u = new zn({ fromObject: o.params }))),
          (s = new Ki(n, i, o.body !== void 0 ? o.body : null, {
            headers: c,
            context: o.context,
            params: u,
            reportProgress: o.reportProgress,
            responseType: o.responseType || "json",
            withCredentials: o.withCredentials,
            transferCache: o.transferCache,
          }));
      }
      let a = A(s).pipe(ln((c) => this.handler.handle(c)));
      if (n instanceof Ki || o.observe === "events") return a;
      let l = a.pipe(et((c) => c instanceof Ya));
      switch (o.observe || "body") {
        case "body":
          switch (s.responseType) {
            case "arraybuffer":
              return l.pipe(
                k((c) => {
                  if (c.body !== null && !(c.body instanceof ArrayBuffer))
                    throw new Error("Response is not an ArrayBuffer.");
                  return c.body;
                })
              );
            case "blob":
              return l.pipe(
                k((c) => {
                  if (c.body !== null && !(c.body instanceof Blob))
                    throw new Error("Response is not a Blob.");
                  return c.body;
                })
              );
            case "text":
              return l.pipe(
                k((c) => {
                  if (c.body !== null && typeof c.body != "string")
                    throw new Error("Response is not a string.");
                  return c.body;
                })
              );
            case "json":
            default:
              return l.pipe(k((c) => c.body));
          }
        case "response":
          return l;
        default:
          throw new Error(`Unreachable: unhandled observe type ${o.observe}}`);
      }
    }
    delete(n, i = {}) {
      return this.request("DELETE", n, i);
    }
    get(n, i = {}) {
      return this.request("GET", n, i);
    }
    head(n, i = {}) {
      return this.request("HEAD", n, i);
    }
    jsonp(n, i) {
      return this.request("JSONP", n, {
        params: new zn().append(i, "JSONP_CALLBACK"),
        observe: "body",
        responseType: "json",
      });
    }
    options(n, i = {}) {
      return this.request("OPTIONS", n, i);
    }
    patch(n, i, o = {}) {
      return this.request("PATCH", n, Od(o, i));
    }
    post(n, i, o = {}) {
      return this.request("POST", n, Od(o, i));
    }
    put(n, i, o = {}) {
      return this.request("PUT", n, Od(o, i));
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Xi));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
function vy(t, e) {
  return e(t);
}
function U_(t, e) {
  return (r, n) => e.intercept(r, { handle: (i) => t(i, n) });
}
function H_(t, e, r) {
  return (n, i) => Rt(r, () => e(n, (o) => t(o, i)));
}
var Ld = new S(""),
  Vd = new S(""),
  z_ = new S(""),
  W_ = new S("");
function G_() {
  let t = null;
  return (e, r) => {
    t === null && (t = (D(Ld, { optional: !0 }) ?? []).reduceRight(U_, vy));
    let n = D(hr),
      i = n.add();
    return t(e, r).pipe(Tn(() => n.remove(i)));
  };
}
var gy = (() => {
  let e = class e extends Xi {
    constructor(n, i) {
      super(),
        (this.backend = n),
        (this.injector = i),
        (this.chain = null),
        (this.pendingTasks = D(hr));
      let o = D(W_, { optional: !0 });
      this.backend = o ?? n;
    }
    handle(n) {
      if (this.chain === null) {
        let o = Array.from(
          new Set([...this.injector.get(Vd), ...this.injector.get(z_, [])])
        );
        this.chain = o.reduceRight((s, a) => H_(s, a, this.injector), vy);
      }
      let i = this.pendingTasks.add();
      return this.chain(n, (o) => this.backend.handle(o)).pipe(
        Tn(() => this.pendingTasks.remove(i))
      );
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Qa), b(Qe));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
var q_ = /^\)\]\}',?\n/;
function Z_(t) {
  return "responseURL" in t && t.responseURL
    ? t.responseURL
    : /^X-Request-URL:/m.test(t.getAllResponseHeaders())
    ? t.getResponseHeader("X-Request-URL")
    : null;
}
var my = (() => {
    let e = class e {
      constructor(n) {
        this.xhrFactory = n;
      }
      handle(n) {
        if (n.method === "JSONP") throw new _(-2800, !1);
        let i = this.xhrFactory;
        return (i.ɵloadImpl ? ae(i.ɵloadImpl()) : A(null)).pipe(
          Be(
            () =>
              new H((s) => {
                let a = i.build();
                if (
                  (a.open(n.method, n.urlWithParams),
                  n.withCredentials && (a.withCredentials = !0),
                  n.headers.forEach((x, M) =>
                    a.setRequestHeader(x, M.join(","))
                  ),
                  n.headers.has("Accept") ||
                    a.setRequestHeader(
                      "Accept",
                      "application/json, text/plain, */*"
                    ),
                  !n.headers.has("Content-Type"))
                ) {
                  let x = n.detectContentTypeHeader();
                  x !== null && a.setRequestHeader("Content-Type", x);
                }
                if (n.responseType) {
                  let x = n.responseType.toLowerCase();
                  a.responseType = x !== "json" ? x : "text";
                }
                let l = n.serializeBody(),
                  c = null,
                  u = () => {
                    if (c !== null) return c;
                    let x = a.statusText || "OK",
                      M = new yr(a.getAllResponseHeaders()),
                      ge = Z_(a) || n.url;
                    return (
                      (c = new Fd({
                        headers: M,
                        status: a.status,
                        statusText: x,
                        url: ge,
                      })),
                      c
                    );
                  },
                  d = () => {
                    let {
                        headers: x,
                        status: M,
                        statusText: ge,
                        url: Ie,
                      } = u(),
                      se = null;
                    M !== Xa.NoContent &&
                      (se =
                        typeof a.response > "u" ? a.responseText : a.response),
                      M === 0 && (M = se ? Xa.Ok : 0);
                    let Xe = M >= 200 && M < 300;
                    if (n.responseType === "json" && typeof se == "string") {
                      let st = se;
                      se = se.replace(q_, "");
                      try {
                        se = se !== "" ? JSON.parse(se) : null;
                      } catch (_n) {
                        (se = st),
                          Xe && ((Xe = !1), (se = { error: _n, text: se }));
                      }
                    }
                    Xe
                      ? (s.next(
                          new Ya({
                            body: se,
                            headers: x,
                            status: M,
                            statusText: ge,
                            url: Ie || void 0,
                          })
                        ),
                        s.complete())
                      : s.error(
                          new Ka({
                            error: se,
                            headers: x,
                            status: M,
                            statusText: ge,
                            url: Ie || void 0,
                          })
                        );
                  },
                  f = (x) => {
                    let { url: M } = u(),
                      ge = new Ka({
                        error: x,
                        status: a.status || 0,
                        statusText: a.statusText || "Unknown Error",
                        url: M || void 0,
                      });
                    s.error(ge);
                  },
                  g = !1,
                  C = (x) => {
                    g || (s.next(u()), (g = !0));
                    let M = { type: ii.DownloadProgress, loaded: x.loaded };
                    x.lengthComputable && (M.total = x.total),
                      n.responseType === "text" &&
                        a.responseText &&
                        (M.partialText = a.responseText),
                      s.next(M);
                  },
                  I = (x) => {
                    let M = { type: ii.UploadProgress, loaded: x.loaded };
                    x.lengthComputable && (M.total = x.total), s.next(M);
                  };
                return (
                  a.addEventListener("load", d),
                  a.addEventListener("error", f),
                  a.addEventListener("timeout", f),
                  a.addEventListener("abort", f),
                  n.reportProgress &&
                    (a.addEventListener("progress", C),
                    l !== null &&
                      a.upload &&
                      a.upload.addEventListener("progress", I)),
                  a.send(l),
                  s.next({ type: ii.Sent }),
                  () => {
                    a.removeEventListener("error", f),
                      a.removeEventListener("abort", f),
                      a.removeEventListener("load", d),
                      a.removeEventListener("timeout", f),
                      n.reportProgress &&
                        (a.removeEventListener("progress", C),
                        l !== null &&
                          a.upload &&
                          a.upload.removeEventListener("progress", I)),
                      a.readyState !== a.DONE && a.abort();
                  }
                );
              })
          )
        );
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(ti));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Dy = new S(""),
  Q_ = "XSRF-TOKEN",
  Y_ = new S("", { providedIn: "root", factory: () => Q_ }),
  K_ = "X-XSRF-TOKEN",
  X_ = new S("", { providedIn: "root", factory: () => K_ }),
  Ja = class {},
  J_ = (() => {
    let e = class e {
      constructor(n, i, o) {
        (this.doc = n),
          (this.platform = i),
          (this.cookieName = o),
          (this.lastCookieString = ""),
          (this.lastToken = null),
          (this.parseCount = 0);
      }
      getToken() {
        if (this.platform === "server") return null;
        let n = this.doc.cookie || "";
        return (
          n !== this.lastCookieString &&
            (this.parseCount++,
            (this.lastToken = za(n, this.cookieName)),
            (this.lastCookieString = n)),
          this.lastToken
        );
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Te), b(rt), b(Y_));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function eS(t, e) {
  let r = t.url.toLowerCase();
  if (
    !D(Dy) ||
    t.method === "GET" ||
    t.method === "HEAD" ||
    r.startsWith("http://") ||
    r.startsWith("https://")
  )
    return e(t);
  let n = D(Ja).getToken(),
    i = D(X_);
  return (
    n != null &&
      !t.headers.has(i) &&
      (t = t.clone({ headers: t.headers.set(i, n) })),
    e(t)
  );
}
var wy = (function (t) {
  return (
    (t[(t.Interceptors = 0)] = "Interceptors"),
    (t[(t.LegacyInterceptors = 1)] = "LegacyInterceptors"),
    (t[(t.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
    (t[(t.NoXsrfProtection = 3)] = "NoXsrfProtection"),
    (t[(t.JsonpSupport = 4)] = "JsonpSupport"),
    (t[(t.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
    (t[(t.Fetch = 6)] = "Fetch"),
    t
  );
})(wy || {});
function tS(t, e) {
  return { ɵkind: t, ɵproviders: e };
}
function nS(...t) {
  let e = [
    Vt,
    my,
    gy,
    { provide: Xi, useExisting: gy },
    { provide: Qa, useExisting: my },
    { provide: Vd, useValue: eS, multi: !0 },
    { provide: Dy, useValue: !0 },
    { provide: Ja, useClass: J_ },
  ];
  for (let r of t) e.push(...r.ɵproviders);
  return ta(e);
}
var yy = new S("");
function rS() {
  return tS(wy.LegacyInterceptors, [
    { provide: yy, useFactory: G_ },
    { provide: Vd, useExisting: yy, multi: !0 },
  ]);
}
var by = (() => {
  let e = class e {};
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵmod = Re({ type: e })),
    (e.ɵinj = Ne({ providers: [nS(rS())] }));
  let t = e;
  return t;
})();
var $d = class extends $a {
    constructor() {
      super(...arguments), (this.supportsDOMEvents = !0);
    }
  },
  Ud = class t extends $d {
    static makeCurrent() {
      ny(new t());
    }
    onAndCancel(e, r, n) {
      return (
        e.addEventListener(r, n),
        () => {
          e.removeEventListener(r, n);
        }
      );
    }
    dispatchEvent(e, r) {
      e.dispatchEvent(r);
    }
    remove(e) {
      e.parentNode && e.parentNode.removeChild(e);
    }
    createElement(e, r) {
      return (r = r || this.getDefaultDocument()), r.createElement(e);
    }
    createHtmlDocument() {
      return document.implementation.createHTMLDocument("fakeTitle");
    }
    getDefaultDocument() {
      return document;
    }
    isElementNode(e) {
      return e.nodeType === Node.ELEMENT_NODE;
    }
    isShadowRoot(e) {
      return e instanceof DocumentFragment;
    }
    getGlobalEventTarget(e, r) {
      return r === "window"
        ? window
        : r === "document"
        ? e
        : r === "body"
        ? e.body
        : null;
    }
    getBaseHref(e) {
      let r = iS();
      return r == null ? null : oS(r);
    }
    resetBaseElement() {
      to = null;
    }
    getUserAgent() {
      return window.navigator.userAgent;
    }
    getCookie(e) {
      return za(document.cookie, e);
    }
  },
  to = null;
function iS() {
  return (
    (to = to || document.querySelector("base")),
    to ? to.getAttribute("href") : null
  );
}
function oS(t) {
  return new URL(t, document.baseURI).pathname;
}
var Hd = class {
    addToWindow(e) {
      (be.getAngularTestability = (n, i = !0) => {
        let o = e.findTestabilityInTree(n, i);
        if (o == null) throw new _(5103, !1);
        return o;
      }),
        (be.getAllAngularTestabilities = () => e.getAllTestabilities()),
        (be.getAllAngularRootElements = () => e.getAllRootElements());
      let r = (n) => {
        let i = be.getAllAngularTestabilities(),
          o = i.length,
          s = function () {
            o--, o == 0 && n();
          };
        i.forEach((a) => {
          a.whenStable(s);
        });
      };
      be.frameworkStabilizers || (be.frameworkStabilizers = []),
        be.frameworkStabilizers.push(r);
    }
    findTestabilityInTree(e, r, n) {
      if (r == null) return null;
      let i = e.getTestability(r);
      return (
        i ??
        (n
          ? Yt().isShadowRoot(r)
            ? this.findTestabilityInTree(e, r.host, !0)
            : this.findTestabilityInTree(e, r.parentElement, !0)
          : null)
      );
    }
  },
  sS = (() => {
    let e = class e {
      build() {
        return new XMLHttpRequest();
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  zd = new S(""),
  _y = (() => {
    let e = class e {
      constructor(n, i) {
        (this._zone = i),
          (this._eventNameToPlugin = new Map()),
          n.forEach((o) => {
            o.manager = this;
          }),
          (this._plugins = n.slice().reverse());
      }
      addEventListener(n, i, o) {
        return this._findPluginFor(i).addEventListener(n, i, o);
      }
      getZone() {
        return this._zone;
      }
      _findPluginFor(n) {
        let i = this._eventNameToPlugin.get(n);
        if (i) return i;
        if (((i = this._plugins.find((s) => s.supports(n))), !i))
          throw new _(5101, !1);
        return this._eventNameToPlugin.set(n, i), i;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(zd), b(ie));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  el = class {
    constructor(e) {
      this._doc = e;
    }
  },
  jd = "ng-app-id",
  Sy = (() => {
    let e = class e {
      constructor(n, i, o, s = {}) {
        (this.doc = n),
          (this.appId = i),
          (this.nonce = o),
          (this.platformId = s),
          (this.styleRef = new Map()),
          (this.hostNodes = new Set()),
          (this.styleNodesInDOM = this.collectServerRenderedStyles()),
          (this.platformIsServer = qa(s)),
          this.resetHostNodes();
      }
      addStyles(n) {
        for (let i of n)
          this.changeUsageCount(i, 1) === 1 && this.onStyleAdded(i);
      }
      removeStyles(n) {
        for (let i of n)
          this.changeUsageCount(i, -1) <= 0 && this.onStyleRemoved(i);
      }
      ngOnDestroy() {
        let n = this.styleNodesInDOM;
        n && (n.forEach((i) => i.remove()), n.clear());
        for (let i of this.getAllStyles()) this.onStyleRemoved(i);
        this.resetHostNodes();
      }
      addHost(n) {
        this.hostNodes.add(n);
        for (let i of this.getAllStyles()) this.addStyleToHost(n, i);
      }
      removeHost(n) {
        this.hostNodes.delete(n);
      }
      getAllStyles() {
        return this.styleRef.keys();
      }
      onStyleAdded(n) {
        for (let i of this.hostNodes) this.addStyleToHost(i, n);
      }
      onStyleRemoved(n) {
        let i = this.styleRef;
        i.get(n)?.elements?.forEach((o) => o.remove()), i.delete(n);
      }
      collectServerRenderedStyles() {
        let n = this.doc.head?.querySelectorAll(`style[${jd}="${this.appId}"]`);
        if (n?.length) {
          let i = new Map();
          return (
            n.forEach((o) => {
              o.textContent != null && i.set(o.textContent, o);
            }),
            i
          );
        }
        return null;
      }
      changeUsageCount(n, i) {
        let o = this.styleRef;
        if (o.has(n)) {
          let s = o.get(n);
          return (s.usage += i), s.usage;
        }
        return o.set(n, { usage: i, elements: [] }), i;
      }
      getStyleElement(n, i) {
        let o = this.styleNodesInDOM,
          s = o?.get(i);
        if (s?.parentNode === n) return o.delete(i), s.removeAttribute(jd), s;
        {
          let a = this.doc.createElement("style");
          return (
            this.nonce && a.setAttribute("nonce", this.nonce),
            (a.textContent = i),
            this.platformIsServer && a.setAttribute(jd, this.appId),
            n.appendChild(a),
            a
          );
        }
      }
      addStyleToHost(n, i) {
        let o = this.getStyleElement(n, i),
          s = this.styleRef,
          a = s.get(i)?.elements;
        a ? a.push(o) : s.set(i, { elements: [o], usage: 1 });
      }
      resetHostNodes() {
        let n = this.hostNodes;
        n.clear(), n.add(this.doc.head);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Te), b(da), b(zu, 8), b(rt));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Bd = {
    svg: "http://www.w3.org/2000/svg",
    xhtml: "http://www.w3.org/1999/xhtml",
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/",
    math: "http://www.w3.org/1998/MathML/",
  },
  Gd = /%COMP%/g,
  My = "%COMP%",
  aS = `_nghost-${My}`,
  lS = `_ngcontent-${My}`,
  cS = !0,
  uS = new S("", { providedIn: "root", factory: () => cS });
function dS(t) {
  return lS.replace(Gd, t);
}
function fS(t) {
  return aS.replace(Gd, t);
}
function xy(t, e) {
  return e.map((r) => r.replace(Gd, t));
}
var Cy = (() => {
    let e = class e {
      constructor(n, i, o, s, a, l, c, u = null) {
        (this.eventManager = n),
          (this.sharedStylesHost = i),
          (this.appId = o),
          (this.removeStylesOnCompDestroy = s),
          (this.doc = a),
          (this.platformId = l),
          (this.ngZone = c),
          (this.nonce = u),
          (this.rendererByCompId = new Map()),
          (this.platformIsServer = qa(l)),
          (this.defaultRenderer = new no(n, a, c, this.platformIsServer));
      }
      createRenderer(n, i) {
        if (!n || !i) return this.defaultRenderer;
        this.platformIsServer &&
          i.encapsulation === Ht.ShadowDom &&
          (i = Z(v({}, i), { encapsulation: Ht.Emulated }));
        let o = this.getOrCreateRenderer(n, i);
        return (
          o instanceof tl
            ? o.applyToHost(n)
            : o instanceof ro && o.applyStyles(),
          o
        );
      }
      getOrCreateRenderer(n, i) {
        let o = this.rendererByCompId,
          s = o.get(i.id);
        if (!s) {
          let a = this.doc,
            l = this.ngZone,
            c = this.eventManager,
            u = this.sharedStylesHost,
            d = this.removeStylesOnCompDestroy,
            f = this.platformIsServer;
          switch (i.encapsulation) {
            case Ht.Emulated:
              s = new tl(c, u, i, this.appId, d, a, l, f);
              break;
            case Ht.ShadowDom:
              return new Wd(c, u, n, i, a, l, this.nonce, f);
            default:
              s = new ro(c, u, i, d, a, l, f);
              break;
          }
          o.set(i.id, s);
        }
        return s;
      }
      ngOnDestroy() {
        this.rendererByCompId.clear();
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(
        b(_y),
        b(Sy),
        b(da),
        b(uS),
        b(Te),
        b(rt),
        b(ie),
        b(zu)
      );
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  no = class {
    constructor(e, r, n, i) {
      (this.eventManager = e),
        (this.doc = r),
        (this.ngZone = n),
        (this.platformIsServer = i),
        (this.data = Object.create(null)),
        (this.throwOnSyntheticProps = !0),
        (this.destroyNode = null);
    }
    destroy() {}
    createElement(e, r) {
      return r
        ? this.doc.createElementNS(Bd[r] || r, e)
        : this.doc.createElement(e);
    }
    createComment(e) {
      return this.doc.createComment(e);
    }
    createText(e) {
      return this.doc.createTextNode(e);
    }
    appendChild(e, r) {
      (Ey(e) ? e.content : e).appendChild(r);
    }
    insertBefore(e, r, n) {
      e && (Ey(e) ? e.content : e).insertBefore(r, n);
    }
    removeChild(e, r) {
      e && e.removeChild(r);
    }
    selectRootElement(e, r) {
      let n = typeof e == "string" ? this.doc.querySelector(e) : e;
      if (!n) throw new _(-5104, !1);
      return r || (n.textContent = ""), n;
    }
    parentNode(e) {
      return e.parentNode;
    }
    nextSibling(e) {
      return e.nextSibling;
    }
    setAttribute(e, r, n, i) {
      if (i) {
        r = i + ":" + r;
        let o = Bd[i];
        o ? e.setAttributeNS(o, r, n) : e.setAttribute(r, n);
      } else e.setAttribute(r, n);
    }
    removeAttribute(e, r, n) {
      if (n) {
        let i = Bd[n];
        i ? e.removeAttributeNS(i, r) : e.removeAttribute(`${n}:${r}`);
      } else e.removeAttribute(r);
    }
    addClass(e, r) {
      e.classList.add(r);
    }
    removeClass(e, r) {
      e.classList.remove(r);
    }
    setStyle(e, r, n, i) {
      i & (fn.DashCase | fn.Important)
        ? e.style.setProperty(r, n, i & fn.Important ? "important" : "")
        : (e.style[r] = n);
    }
    removeStyle(e, r, n) {
      n & fn.DashCase ? e.style.removeProperty(r) : (e.style[r] = "");
    }
    setProperty(e, r, n) {
      e != null && (e[r] = n);
    }
    setValue(e, r) {
      e.nodeValue = r;
    }
    listen(e, r, n) {
      if (
        typeof e == "string" &&
        ((e = Yt().getGlobalEventTarget(this.doc, e)), !e)
      )
        throw new Error(`Unsupported event target ${e} for event ${r}`);
      return this.eventManager.addEventListener(
        e,
        r,
        this.decoratePreventDefault(n)
      );
    }
    decoratePreventDefault(e) {
      return (r) => {
        if (r === "__ngUnwrap__") return e;
        (this.platformIsServer ? this.ngZone.runGuarded(() => e(r)) : e(r)) ===
          !1 && r.preventDefault();
      };
    }
  };
function Ey(t) {
  return t.tagName === "TEMPLATE" && t.content !== void 0;
}
var Wd = class extends no {
    constructor(e, r, n, i, o, s, a, l) {
      super(e, o, s, l),
        (this.sharedStylesHost = r),
        (this.hostEl = n),
        (this.shadowRoot = n.attachShadow({ mode: "open" })),
        this.sharedStylesHost.addHost(this.shadowRoot);
      let c = xy(i.id, i.styles);
      for (let u of c) {
        let d = document.createElement("style");
        a && d.setAttribute("nonce", a),
          (d.textContent = u),
          this.shadowRoot.appendChild(d);
      }
    }
    nodeOrShadowRoot(e) {
      return e === this.hostEl ? this.shadowRoot : e;
    }
    appendChild(e, r) {
      return super.appendChild(this.nodeOrShadowRoot(e), r);
    }
    insertBefore(e, r, n) {
      return super.insertBefore(this.nodeOrShadowRoot(e), r, n);
    }
    removeChild(e, r) {
      return super.removeChild(this.nodeOrShadowRoot(e), r);
    }
    parentNode(e) {
      return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(e)));
    }
    destroy() {
      this.sharedStylesHost.removeHost(this.shadowRoot);
    }
  },
  ro = class extends no {
    constructor(e, r, n, i, o, s, a, l) {
      super(e, o, s, a),
        (this.sharedStylesHost = r),
        (this.removeStylesOnCompDestroy = i),
        (this.styles = l ? xy(l, n.styles) : n.styles);
    }
    applyStyles() {
      this.sharedStylesHost.addStyles(this.styles);
    }
    destroy() {
      this.removeStylesOnCompDestroy &&
        this.sharedStylesHost.removeStyles(this.styles);
    }
  },
  tl = class extends ro {
    constructor(e, r, n, i, o, s, a, l) {
      let c = i + "-" + n.id;
      super(e, r, n, o, s, a, l, c),
        (this.contentAttr = dS(c)),
        (this.hostAttr = fS(c));
    }
    applyToHost(e) {
      this.applyStyles(), this.setAttribute(e, this.hostAttr, "");
    }
    createElement(e, r) {
      let n = super.createElement(e, r);
      return super.setAttribute(n, this.contentAttr, ""), n;
    }
  },
  hS = (() => {
    let e = class e extends el {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return !0;
      }
      addEventListener(n, i, o) {
        return (
          n.addEventListener(i, o, !1), () => this.removeEventListener(n, i, o)
        );
      }
      removeEventListener(n, i, o) {
        return n.removeEventListener(i, o);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Te));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  Iy = ["alt", "control", "meta", "shift"],
  pS = {
    "\b": "Backspace",
    "	": "Tab",
    "\x7F": "Delete",
    "\x1B": "Escape",
    Del: "Delete",
    Esc: "Escape",
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
    Menu: "ContextMenu",
    Scroll: "ScrollLock",
    Win: "OS",
  },
  gS = {
    alt: (t) => t.altKey,
    control: (t) => t.ctrlKey,
    meta: (t) => t.metaKey,
    shift: (t) => t.shiftKey,
  },
  mS = (() => {
    let e = class e extends el {
      constructor(n) {
        super(n);
      }
      supports(n) {
        return e.parseEventName(n) != null;
      }
      addEventListener(n, i, o) {
        let s = e.parseEventName(i),
          a = e.eventCallback(s.fullKey, o, this.manager.getZone());
        return this.manager
          .getZone()
          .runOutsideAngular(() => Yt().onAndCancel(n, s.domEventName, a));
      }
      static parseEventName(n) {
        let i = n.toLowerCase().split("."),
          o = i.shift();
        if (i.length === 0 || !(o === "keydown" || o === "keyup")) return null;
        let s = e._normalizeKey(i.pop()),
          a = "",
          l = i.indexOf("code");
        if (
          (l > -1 && (i.splice(l, 1), (a = "code.")),
          Iy.forEach((u) => {
            let d = i.indexOf(u);
            d > -1 && (i.splice(d, 1), (a += u + "."));
          }),
          (a += s),
          i.length != 0 || s.length === 0)
        )
          return null;
        let c = {};
        return (c.domEventName = o), (c.fullKey = a), c;
      }
      static matchEventFullKeyCode(n, i) {
        let o = pS[n.key] || n.key,
          s = "";
        return (
          i.indexOf("code.") > -1 && ((o = n.code), (s = "code.")),
          o == null || !o
            ? !1
            : ((o = o.toLowerCase()),
              o === " " ? (o = "space") : o === "." && (o = "dot"),
              Iy.forEach((a) => {
                if (a !== o) {
                  let l = gS[a];
                  l(n) && (s += a + ".");
                }
              }),
              (s += o),
              s === i)
        );
      }
      static eventCallback(n, i, o) {
        return (s) => {
          e.matchEventFullKeyCode(s, n) && o.runGuarded(() => i(s));
        };
      }
      static _normalizeKey(n) {
        return n === "esc" ? "escape" : n;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Te));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function yS() {
  Ud.makeCurrent();
}
function vS() {
  return new Wt();
}
function DS() {
  return Rg(document), document;
}
var wS = [
    { provide: rt, useValue: Rd },
    { provide: Hu, useValue: yS, multi: !0 },
    { provide: Te, useFactory: DS, deps: [] },
  ],
  Ty = gd(Gm, "browser", wS),
  bS = new S(""),
  CS = [
    { provide: Yi, useClass: Hd, deps: [] },
    { provide: fd, useClass: Ma, deps: [ie, xa, Yi] },
    { provide: Ma, useClass: Ma, deps: [ie, xa, Yi] },
  ],
  ES = [
    { provide: na, useValue: "root" },
    { provide: Wt, useFactory: vS, deps: [] },
    { provide: zd, useClass: hS, multi: !0, deps: [Te, ie, rt] },
    { provide: zd, useClass: mS, multi: !0, deps: [Te] },
    Cy,
    Sy,
    _y,
    { provide: Bi, useExisting: Cy },
    { provide: ti, useClass: sS, deps: [] },
    [],
  ],
  Ay = (() => {
    let e = class e {
      constructor(n) {}
      static withServerTransition(n) {
        return { ngModule: e, providers: [{ provide: da, useValue: n.appId }] };
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(bS, 12));
    }),
      (e.ɵmod = Re({ type: e })),
      (e.ɵinj = Ne({ providers: [...ES, ...CS], imports: [Ga, qm] }));
    let t = e;
    return t;
  })();
var Ny = (() => {
  let e = class e {
    constructor(n) {
      this._doc = n;
    }
    getTitle() {
      return this._doc.title;
    }
    setTitle(n) {
      this._doc.title = n || "";
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Te));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var qd = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({
        token: e,
        factory: function (i) {
          let o = null;
          return i ? (o = new (i || e)()) : (o = b(IS)), o;
        },
        providedIn: "root",
      }));
    let t = e;
    return t;
  })(),
  IS = (() => {
    let e = class e extends qd {
      constructor(n) {
        super(), (this._doc = n);
      }
      sanitize(n, i) {
        if (i == null) return null;
        switch (n) {
          case vt.NONE:
            return i;
          case vt.HTML:
            return jn(i, "HTML") ? Gt(i) : zg(this._doc, String(i)).toString();
          case vt.STYLE:
            return jn(i, "Style") ? Gt(i) : i;
          case vt.SCRIPT:
            if (jn(i, "Script")) return Gt(i);
            throw new _(5200, !1);
          case vt.URL:
            return jn(i, "URL") ? Gt(i) : ha(String(i));
          case vt.RESOURCE_URL:
            if (jn(i, "ResourceURL")) return Gt(i);
            throw new _(5201, !1);
          default:
            throw new _(5202, !1);
        }
      }
      bypassSecurityTrustHtml(n) {
        return kg(n);
      }
      bypassSecurityTrustStyle(n) {
        return Pg(n);
      }
      bypassSecurityTrustScript(n) {
        return Fg(n);
      }
      bypassSecurityTrustUrl(n) {
        return Lg(n);
      }
      bypassSecurityTrustResourceUrl(n) {
        return Vg(n);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Te));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
var F = "primary",
  Do = Symbol("RouteTitle"),
  Jd = class {
    constructor(e) {
      this.params = e || {};
    }
    has(e) {
      return Object.prototype.hasOwnProperty.call(this.params, e);
    }
    get(e) {
      if (this.has(e)) {
        let r = this.params[e];
        return Array.isArray(r) ? r[0] : r;
      }
      return null;
    }
    getAll(e) {
      if (this.has(e)) {
        let r = this.params[e];
        return Array.isArray(r) ? r : [r];
      }
      return [];
    }
    get keys() {
      return Object.keys(this.params);
    }
  };
function ci(t) {
  return new Jd(t);
}
function _S(t, e, r) {
  let n = r.path.split("/");
  if (
    n.length > t.length ||
    (r.pathMatch === "full" && (e.hasChildren() || n.length < t.length))
  )
    return null;
  let i = {};
  for (let o = 0; o < n.length; o++) {
    let s = n[o],
      a = t[o];
    if (s.startsWith(":")) i[s.substring(1)] = a;
    else if (s !== a.path) return null;
  }
  return { consumed: t.slice(0, n.length), posParams: i };
}
function SS(t, e) {
  if (t.length !== e.length) return !1;
  for (let r = 0; r < t.length; ++r) if (!Xt(t[r], e[r])) return !1;
  return !0;
}
function Xt(t, e) {
  let r = t ? ef(t) : void 0,
    n = e ? ef(e) : void 0;
  if (!r || !n || r.length != n.length) return !1;
  let i;
  for (let o = 0; o < r.length; o++)
    if (((i = r[o]), !By(t[i], e[i]))) return !1;
  return !0;
}
function ef(t) {
  return [...Object.keys(t), ...Object.getOwnPropertySymbols(t)];
}
function By(t, e) {
  if (Array.isArray(t) && Array.isArray(e)) {
    if (t.length !== e.length) return !1;
    let r = [...t].sort(),
      n = [...e].sort();
    return r.every((i, o) => n[o] === i);
  } else return t === e;
}
function $y(t) {
  return t.length > 0 ? t[t.length - 1] : null;
}
function Zn(t) {
  return Jl(t) ? t : $n(t) ? ae(Promise.resolve(t)) : A(t);
}
var MS = { exact: Hy, subset: zy },
  Uy = { exact: xS, subset: TS, ignored: () => !0 };
function Ry(t, e, r) {
  return (
    MS[r.paths](t.root, e.root, r.matrixParams) &&
    Uy[r.queryParams](t.queryParams, e.queryParams) &&
    !(r.fragment === "exact" && t.fragment !== e.fragment)
  );
}
function xS(t, e) {
  return Xt(t, e);
}
function Hy(t, e, r) {
  if (
    !Dr(t.segments, e.segments) ||
    !il(t.segments, e.segments, r) ||
    t.numberOfChildren !== e.numberOfChildren
  )
    return !1;
  for (let n in e.children)
    if (!t.children[n] || !Hy(t.children[n], e.children[n], r)) return !1;
  return !0;
}
function TS(t, e) {
  return (
    Object.keys(e).length <= Object.keys(t).length &&
    Object.keys(e).every((r) => By(t[r], e[r]))
  );
}
function zy(t, e, r) {
  return Wy(t, e, e.segments, r);
}
function Wy(t, e, r, n) {
  if (t.segments.length > r.length) {
    let i = t.segments.slice(0, r.length);
    return !(!Dr(i, r) || e.hasChildren() || !il(i, r, n));
  } else if (t.segments.length === r.length) {
    if (!Dr(t.segments, r) || !il(t.segments, r, n)) return !1;
    for (let i in e.children)
      if (!t.children[i] || !zy(t.children[i], e.children[i], n)) return !1;
    return !0;
  } else {
    let i = r.slice(0, t.segments.length),
      o = r.slice(t.segments.length);
    return !Dr(t.segments, i) || !il(t.segments, i, n) || !t.children[F]
      ? !1
      : Wy(t.children[F], e, o, n);
  }
}
function il(t, e, r) {
  return e.every((n, i) => Uy[r](t[i].parameters, n.parameters));
}
var Wn = class {
    constructor(e = new ee([], {}), r = {}, n = null) {
      (this.root = e), (this.queryParams = r), (this.fragment = n);
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= ci(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      return RS.serialize(this);
    }
  },
  ee = class {
    constructor(e, r) {
      (this.segments = e),
        (this.children = r),
        (this.parent = null),
        Object.values(r).forEach((n) => (n.parent = this));
    }
    hasChildren() {
      return this.numberOfChildren > 0;
    }
    get numberOfChildren() {
      return Object.keys(this.children).length;
    }
    toString() {
      return ol(this);
    }
  },
  vr = class {
    constructor(e, r) {
      (this.path = e), (this.parameters = r);
    }
    get parameterMap() {
      return (this._parameterMap ??= ci(this.parameters)), this._parameterMap;
    }
    toString() {
      return qy(this);
    }
  };
function AS(t, e) {
  return Dr(t, e) && t.every((r, n) => Xt(r.parameters, e[n].parameters));
}
function Dr(t, e) {
  return t.length !== e.length ? !1 : t.every((r, n) => r.path === e[n].path);
}
function NS(t, e) {
  let r = [];
  return (
    Object.entries(t.children).forEach(([n, i]) => {
      n === F && (r = r.concat(e(i, n)));
    }),
    Object.entries(t.children).forEach(([n, i]) => {
      n !== F && (r = r.concat(e(i, n)));
    }),
    r
  );
}
var wo = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: () => new uo(), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  uo = class {
    parse(e) {
      let r = new nf(e);
      return new Wn(
        r.parseRootSegment(),
        r.parseQueryParams(),
        r.parseFragment()
      );
    }
    serialize(e) {
      let r = `/${io(e.root, !0)}`,
        n = PS(e.queryParams),
        i = typeof e.fragment == "string" ? `#${OS(e.fragment)}` : "";
      return `${r}${n}${i}`;
    }
  },
  RS = new uo();
function ol(t) {
  return t.segments.map((e) => qy(e)).join("/");
}
function io(t, e) {
  if (!t.hasChildren()) return ol(t);
  if (e) {
    let r = t.children[F] ? io(t.children[F], !1) : "",
      n = [];
    return (
      Object.entries(t.children).forEach(([i, o]) => {
        i !== F && n.push(`${i}:${io(o, !1)}`);
      }),
      n.length > 0 ? `${r}(${n.join("//")})` : r
    );
  } else {
    let r = NS(t, (n, i) =>
      i === F ? [io(t.children[F], !1)] : [`${i}:${io(n, !1)}`]
    );
    return Object.keys(t.children).length === 1 && t.children[F] != null
      ? `${ol(t)}/${r[0]}`
      : `${ol(t)}/(${r.join("//")})`;
  }
}
function Gy(t) {
  return encodeURIComponent(t)
    .replace(/%40/g, "@")
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",");
}
function nl(t) {
  return Gy(t).replace(/%3B/gi, ";");
}
function OS(t) {
  return encodeURI(t);
}
function tf(t) {
  return Gy(t)
    .replace(/\(/g, "%28")
    .replace(/\)/g, "%29")
    .replace(/%26/gi, "&");
}
function sl(t) {
  return decodeURIComponent(t);
}
function Oy(t) {
  return sl(t.replace(/\+/g, "%20"));
}
function qy(t) {
  return `${tf(t.path)}${kS(t.parameters)}`;
}
function kS(t) {
  return Object.entries(t)
    .map(([e, r]) => `;${tf(e)}=${tf(r)}`)
    .join("");
}
function PS(t) {
  let e = Object.entries(t)
    .map(([r, n]) =>
      Array.isArray(n)
        ? n.map((i) => `${nl(r)}=${nl(i)}`).join("&")
        : `${nl(r)}=${nl(n)}`
    )
    .filter((r) => r);
  return e.length ? `?${e.join("&")}` : "";
}
var FS = /^[^\/()?;#]+/;
function Qd(t) {
  let e = t.match(FS);
  return e ? e[0] : "";
}
var LS = /^[^\/()?;=#]+/;
function VS(t) {
  let e = t.match(LS);
  return e ? e[0] : "";
}
var jS = /^[^=?&#]+/;
function BS(t) {
  let e = t.match(jS);
  return e ? e[0] : "";
}
var $S = /^[^&#]+/;
function US(t) {
  let e = t.match($S);
  return e ? e[0] : "";
}
var nf = class {
  constructor(e) {
    (this.url = e), (this.remaining = e);
  }
  parseRootSegment() {
    return (
      this.consumeOptional("/"),
      this.remaining === "" ||
      this.peekStartsWith("?") ||
      this.peekStartsWith("#")
        ? new ee([], {})
        : new ee([], this.parseChildren())
    );
  }
  parseQueryParams() {
    let e = {};
    if (this.consumeOptional("?"))
      do this.parseQueryParam(e);
      while (this.consumeOptional("&"));
    return e;
  }
  parseFragment() {
    return this.consumeOptional("#")
      ? decodeURIComponent(this.remaining)
      : null;
  }
  parseChildren() {
    if (this.remaining === "") return {};
    this.consumeOptional("/");
    let e = [];
    for (
      this.peekStartsWith("(") || e.push(this.parseSegment());
      this.peekStartsWith("/") &&
      !this.peekStartsWith("//") &&
      !this.peekStartsWith("/(");

    )
      this.capture("/"), e.push(this.parseSegment());
    let r = {};
    this.peekStartsWith("/(") &&
      (this.capture("/"), (r = this.parseParens(!0)));
    let n = {};
    return (
      this.peekStartsWith("(") && (n = this.parseParens(!1)),
      (e.length > 0 || Object.keys(r).length > 0) && (n[F] = new ee(e, r)),
      n
    );
  }
  parseSegment() {
    let e = Qd(this.remaining);
    if (e === "" && this.peekStartsWith(";")) throw new _(4009, !1);
    return this.capture(e), new vr(sl(e), this.parseMatrixParams());
  }
  parseMatrixParams() {
    let e = {};
    for (; this.consumeOptional(";"); ) this.parseParam(e);
    return e;
  }
  parseParam(e) {
    let r = VS(this.remaining);
    if (!r) return;
    this.capture(r);
    let n = "";
    if (this.consumeOptional("=")) {
      let i = Qd(this.remaining);
      i && ((n = i), this.capture(n));
    }
    e[sl(r)] = sl(n);
  }
  parseQueryParam(e) {
    let r = BS(this.remaining);
    if (!r) return;
    this.capture(r);
    let n = "";
    if (this.consumeOptional("=")) {
      let s = US(this.remaining);
      s && ((n = s), this.capture(n));
    }
    let i = Oy(r),
      o = Oy(n);
    if (e.hasOwnProperty(i)) {
      let s = e[i];
      Array.isArray(s) || ((s = [s]), (e[i] = s)), s.push(o);
    } else e[i] = o;
  }
  parseParens(e) {
    let r = {};
    for (
      this.capture("(");
      !this.consumeOptional(")") && this.remaining.length > 0;

    ) {
      let n = Qd(this.remaining),
        i = this.remaining[n.length];
      if (i !== "/" && i !== ")" && i !== ";") throw new _(4010, !1);
      let o;
      n.indexOf(":") > -1
        ? ((o = n.slice(0, n.indexOf(":"))), this.capture(o), this.capture(":"))
        : e && (o = F);
      let s = this.parseChildren();
      (r[o] = Object.keys(s).length === 1 ? s[F] : new ee([], s)),
        this.consumeOptional("//");
    }
    return r;
  }
  peekStartsWith(e) {
    return this.remaining.startsWith(e);
  }
  consumeOptional(e) {
    return this.peekStartsWith(e)
      ? ((this.remaining = this.remaining.substring(e.length)), !0)
      : !1;
  }
  capture(e) {
    if (!this.consumeOptional(e)) throw new _(4011, !1);
  }
};
function Zy(t) {
  return t.segments.length > 0 ? new ee([], { [F]: t }) : t;
}
function Qy(t) {
  let e = {};
  for (let [n, i] of Object.entries(t.children)) {
    let o = Qy(i);
    if (n === F && o.segments.length === 0 && o.hasChildren())
      for (let [s, a] of Object.entries(o.children)) e[s] = a;
    else (o.segments.length > 0 || o.hasChildren()) && (e[n] = o);
  }
  let r = new ee(t.segments, e);
  return HS(r);
}
function HS(t) {
  if (t.numberOfChildren === 1 && t.children[F]) {
    let e = t.children[F];
    return new ee(t.segments.concat(e.segments), e.children);
  }
  return t;
}
function ui(t) {
  return t instanceof Wn;
}
function zS(t, e, r = null, n = null) {
  let i = Yy(t);
  return Ky(i, e, r, n);
}
function Yy(t) {
  let e;
  function r(o) {
    let s = {};
    for (let l of o.children) {
      let c = r(l);
      s[l.outlet] = c;
    }
    let a = new ee(o.url, s);
    return o === t && (e = a), a;
  }
  let n = r(t.root),
    i = Zy(n);
  return e ?? i;
}
function Ky(t, e, r, n) {
  let i = t;
  for (; i.parent; ) i = i.parent;
  if (e.length === 0) return Yd(i, i, i, r, n);
  let o = WS(e);
  if (o.toRoot()) return Yd(i, i, new ee([], {}), r, n);
  let s = GS(o, i, t),
    a = s.processChildren
      ? ao(s.segmentGroup, s.index, o.commands)
      : Jy(s.segmentGroup, s.index, o.commands);
  return Yd(i, s.segmentGroup, a, r, n);
}
function al(t) {
  return typeof t == "object" && t != null && !t.outlets && !t.segmentPath;
}
function fo(t) {
  return typeof t == "object" && t != null && t.outlets;
}
function Yd(t, e, r, n, i) {
  let o = {};
  n &&
    Object.entries(n).forEach(([l, c]) => {
      o[l] = Array.isArray(c) ? c.map((u) => `${u}`) : `${c}`;
    });
  let s;
  t === e ? (s = r) : (s = Xy(t, e, r));
  let a = Zy(Qy(s));
  return new Wn(a, o, i);
}
function Xy(t, e, r) {
  let n = {};
  return (
    Object.entries(t.children).forEach(([i, o]) => {
      o === e ? (n[i] = r) : (n[i] = Xy(o, e, r));
    }),
    new ee(t.segments, n)
  );
}
var ll = class {
  constructor(e, r, n) {
    if (
      ((this.isAbsolute = e),
      (this.numberOfDoubleDots = r),
      (this.commands = n),
      e && n.length > 0 && al(n[0]))
    )
      throw new _(4003, !1);
    let i = n.find(fo);
    if (i && i !== $y(n)) throw new _(4004, !1);
  }
  toRoot() {
    return (
      this.isAbsolute && this.commands.length === 1 && this.commands[0] == "/"
    );
  }
};
function WS(t) {
  if (typeof t[0] == "string" && t.length === 1 && t[0] === "/")
    return new ll(!0, 0, t);
  let e = 0,
    r = !1,
    n = t.reduce((i, o, s) => {
      if (typeof o == "object" && o != null) {
        if (o.outlets) {
          let a = {};
          return (
            Object.entries(o.outlets).forEach(([l, c]) => {
              a[l] = typeof c == "string" ? c.split("/") : c;
            }),
            [...i, { outlets: a }]
          );
        }
        if (o.segmentPath) return [...i, o.segmentPath];
      }
      return typeof o != "string"
        ? [...i, o]
        : s === 0
        ? (o.split("/").forEach((a, l) => {
            (l == 0 && a === ".") ||
              (l == 0 && a === ""
                ? (r = !0)
                : a === ".."
                ? e++
                : a != "" && i.push(a));
          }),
          i)
        : [...i, o];
    }, []);
  return new ll(r, e, n);
}
var ai = class {
  constructor(e, r, n) {
    (this.segmentGroup = e), (this.processChildren = r), (this.index = n);
  }
};
function GS(t, e, r) {
  if (t.isAbsolute) return new ai(e, !0, 0);
  if (!r) return new ai(e, !1, NaN);
  if (r.parent === null) return new ai(r, !0, 0);
  let n = al(t.commands[0]) ? 0 : 1,
    i = r.segments.length - 1 + n;
  return qS(r, i, t.numberOfDoubleDots);
}
function qS(t, e, r) {
  let n = t,
    i = e,
    o = r;
  for (; o > i; ) {
    if (((o -= i), (n = n.parent), !n)) throw new _(4005, !1);
    i = n.segments.length;
  }
  return new ai(n, !1, i - o);
}
function ZS(t) {
  return fo(t[0]) ? t[0].outlets : { [F]: t };
}
function Jy(t, e, r) {
  if (((t ??= new ee([], {})), t.segments.length === 0 && t.hasChildren()))
    return ao(t, e, r);
  let n = QS(t, e, r),
    i = r.slice(n.commandIndex);
  if (n.match && n.pathIndex < t.segments.length) {
    let o = new ee(t.segments.slice(0, n.pathIndex), {});
    return (
      (o.children[F] = new ee(t.segments.slice(n.pathIndex), t.children)),
      ao(o, 0, i)
    );
  } else
    return n.match && i.length === 0
      ? new ee(t.segments, {})
      : n.match && !t.hasChildren()
      ? rf(t, e, r)
      : n.match
      ? ao(t, 0, i)
      : rf(t, e, r);
}
function ao(t, e, r) {
  if (r.length === 0) return new ee(t.segments, {});
  {
    let n = ZS(r),
      i = {};
    if (
      Object.keys(n).some((o) => o !== F) &&
      t.children[F] &&
      t.numberOfChildren === 1 &&
      t.children[F].segments.length === 0
    ) {
      let o = ao(t.children[F], e, r);
      return new ee(t.segments, o.children);
    }
    return (
      Object.entries(n).forEach(([o, s]) => {
        typeof s == "string" && (s = [s]),
          s !== null && (i[o] = Jy(t.children[o], e, s));
      }),
      Object.entries(t.children).forEach(([o, s]) => {
        n[o] === void 0 && (i[o] = s);
      }),
      new ee(t.segments, i)
    );
  }
}
function QS(t, e, r) {
  let n = 0,
    i = e,
    o = { match: !1, pathIndex: 0, commandIndex: 0 };
  for (; i < t.segments.length; ) {
    if (n >= r.length) return o;
    let s = t.segments[i],
      a = r[n];
    if (fo(a)) break;
    let l = `${a}`,
      c = n < r.length - 1 ? r[n + 1] : null;
    if (i > 0 && l === void 0) break;
    if (l && c && typeof c == "object" && c.outlets === void 0) {
      if (!Py(l, c, s)) return o;
      n += 2;
    } else {
      if (!Py(l, {}, s)) return o;
      n++;
    }
    i++;
  }
  return { match: !0, pathIndex: i, commandIndex: n };
}
function rf(t, e, r) {
  let n = t.segments.slice(0, e),
    i = 0;
  for (; i < r.length; ) {
    let o = r[i];
    if (fo(o)) {
      let l = YS(o.outlets);
      return new ee(n, l);
    }
    if (i === 0 && al(r[0])) {
      let l = t.segments[e];
      n.push(new vr(l.path, ky(r[0]))), i++;
      continue;
    }
    let s = fo(o) ? o.outlets[F] : `${o}`,
      a = i < r.length - 1 ? r[i + 1] : null;
    s && a && al(a)
      ? (n.push(new vr(s, ky(a))), (i += 2))
      : (n.push(new vr(s, {})), i++);
  }
  return new ee(n, {});
}
function YS(t) {
  let e = {};
  return (
    Object.entries(t).forEach(([r, n]) => {
      typeof n == "string" && (n = [n]),
        n !== null && (e[r] = rf(new ee([], {}), 0, n));
    }),
    e
  );
}
function ky(t) {
  let e = {};
  return Object.entries(t).forEach(([r, n]) => (e[r] = `${n}`)), e;
}
function Py(t, e, r) {
  return t == r.path && Xt(e, r.parameters);
}
var lo = "imperative",
  ke = (function (t) {
    return (
      (t[(t.NavigationStart = 0)] = "NavigationStart"),
      (t[(t.NavigationEnd = 1)] = "NavigationEnd"),
      (t[(t.NavigationCancel = 2)] = "NavigationCancel"),
      (t[(t.NavigationError = 3)] = "NavigationError"),
      (t[(t.RoutesRecognized = 4)] = "RoutesRecognized"),
      (t[(t.ResolveStart = 5)] = "ResolveStart"),
      (t[(t.ResolveEnd = 6)] = "ResolveEnd"),
      (t[(t.GuardsCheckStart = 7)] = "GuardsCheckStart"),
      (t[(t.GuardsCheckEnd = 8)] = "GuardsCheckEnd"),
      (t[(t.RouteConfigLoadStart = 9)] = "RouteConfigLoadStart"),
      (t[(t.RouteConfigLoadEnd = 10)] = "RouteConfigLoadEnd"),
      (t[(t.ChildActivationStart = 11)] = "ChildActivationStart"),
      (t[(t.ChildActivationEnd = 12)] = "ChildActivationEnd"),
      (t[(t.ActivationStart = 13)] = "ActivationStart"),
      (t[(t.ActivationEnd = 14)] = "ActivationEnd"),
      (t[(t.Scroll = 15)] = "Scroll"),
      (t[(t.NavigationSkipped = 16)] = "NavigationSkipped"),
      t
    );
  })(ke || {}),
  bt = class {
    constructor(e, r) {
      (this.id = e), (this.url = r);
    }
  },
  di = class extends bt {
    constructor(e, r, n = "imperative", i = null) {
      super(e, r),
        (this.type = ke.NavigationStart),
        (this.navigationTrigger = n),
        (this.restoredState = i);
    }
    toString() {
      return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
    }
  },
  Jt = class extends bt {
    constructor(e, r, n) {
      super(e, r), (this.urlAfterRedirects = n), (this.type = ke.NavigationEnd);
    }
    toString() {
      return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
    }
  },
  dt = (function (t) {
    return (
      (t[(t.Redirect = 0)] = "Redirect"),
      (t[(t.SupersededByNewNavigation = 1)] = "SupersededByNewNavigation"),
      (t[(t.NoDataFromResolver = 2)] = "NoDataFromResolver"),
      (t[(t.GuardRejected = 3)] = "GuardRejected"),
      t
    );
  })(dt || {}),
  cl = (function (t) {
    return (
      (t[(t.IgnoredSameUrlNavigation = 0)] = "IgnoredSameUrlNavigation"),
      (t[(t.IgnoredByUrlHandlingStrategy = 1)] =
        "IgnoredByUrlHandlingStrategy"),
      t
    );
  })(cl || {}),
  Gn = class extends bt {
    constructor(e, r, n, i) {
      super(e, r),
        (this.reason = n),
        (this.code = i),
        (this.type = ke.NavigationCancel);
    }
    toString() {
      return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
    }
  },
  qn = class extends bt {
    constructor(e, r, n, i) {
      super(e, r),
        (this.reason = n),
        (this.code = i),
        (this.type = ke.NavigationSkipped);
    }
  },
  ho = class extends bt {
    constructor(e, r, n, i) {
      super(e, r),
        (this.error = n),
        (this.target = i),
        (this.type = ke.NavigationError);
    }
    toString() {
      return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
    }
  },
  ul = class extends bt {
    constructor(e, r, n, i) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = ke.RoutesRecognized);
    }
    toString() {
      return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  of = class extends bt {
    constructor(e, r, n, i) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = ke.GuardsCheckStart);
    }
    toString() {
      return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  sf = class extends bt {
    constructor(e, r, n, i, o) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.shouldActivate = o),
        (this.type = ke.GuardsCheckEnd);
    }
    toString() {
      return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
    }
  },
  af = class extends bt {
    constructor(e, r, n, i) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = ke.ResolveStart);
    }
    toString() {
      return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  lf = class extends bt {
    constructor(e, r, n, i) {
      super(e, r),
        (this.urlAfterRedirects = n),
        (this.state = i),
        (this.type = ke.ResolveEnd);
    }
    toString() {
      return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
    }
  },
  cf = class {
    constructor(e) {
      (this.route = e), (this.type = ke.RouteConfigLoadStart);
    }
    toString() {
      return `RouteConfigLoadStart(path: ${this.route.path})`;
    }
  },
  uf = class {
    constructor(e) {
      (this.route = e), (this.type = ke.RouteConfigLoadEnd);
    }
    toString() {
      return `RouteConfigLoadEnd(path: ${this.route.path})`;
    }
  },
  df = class {
    constructor(e) {
      (this.snapshot = e), (this.type = ke.ChildActivationStart);
    }
    toString() {
      return `ChildActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  ff = class {
    constructor(e) {
      (this.snapshot = e), (this.type = ke.ChildActivationEnd);
    }
    toString() {
      return `ChildActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  hf = class {
    constructor(e) {
      (this.snapshot = e), (this.type = ke.ActivationStart);
    }
    toString() {
      return `ActivationStart(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  pf = class {
    constructor(e) {
      (this.snapshot = e), (this.type = ke.ActivationEnd);
    }
    toString() {
      return `ActivationEnd(path: '${
        (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
      }')`;
    }
  },
  dl = class {
    constructor(e, r, n) {
      (this.routerEvent = e),
        (this.position = r),
        (this.anchor = n),
        (this.type = ke.Scroll);
    }
    toString() {
      let e = this.position ? `${this.position[0]}, ${this.position[1]}` : null;
      return `Scroll(anchor: '${this.anchor}', position: '${e}')`;
    }
  },
  po = class {},
  go = class {
    constructor(e) {
      this.url = e;
    }
  };
var gf = class {
    constructor() {
      (this.outlet = null),
        (this.route = null),
        (this.injector = null),
        (this.children = new bo()),
        (this.attachRef = null);
    }
  },
  bo = (() => {
    let e = class e {
      constructor() {
        this.contexts = new Map();
      }
      onChildOutletCreated(n, i) {
        let o = this.getOrCreateContext(n);
        (o.outlet = i), this.contexts.set(n, o);
      }
      onChildOutletDestroyed(n) {
        let i = this.getContext(n);
        i && ((i.outlet = null), (i.attachRef = null));
      }
      onOutletDeactivated() {
        let n = this.contexts;
        return (this.contexts = new Map()), n;
      }
      onOutletReAttached(n) {
        this.contexts = n;
      }
      getOrCreateContext(n) {
        let i = this.getContext(n);
        return i || ((i = new gf()), this.contexts.set(n, i)), i;
      }
      getContext(n) {
        return this.contexts.get(n) || null;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  fl = class {
    constructor(e) {
      this._root = e;
    }
    get root() {
      return this._root.value;
    }
    parent(e) {
      let r = this.pathFromRoot(e);
      return r.length > 1 ? r[r.length - 2] : null;
    }
    children(e) {
      let r = mf(e, this._root);
      return r ? r.children.map((n) => n.value) : [];
    }
    firstChild(e) {
      let r = mf(e, this._root);
      return r && r.children.length > 0 ? r.children[0].value : null;
    }
    siblings(e) {
      let r = yf(e, this._root);
      return r.length < 2
        ? []
        : r[r.length - 2].children.map((i) => i.value).filter((i) => i !== e);
    }
    pathFromRoot(e) {
      return yf(e, this._root).map((r) => r.value);
    }
  };
function mf(t, e) {
  if (t === e.value) return e;
  for (let r of e.children) {
    let n = mf(t, r);
    if (n) return n;
  }
  return null;
}
function yf(t, e) {
  if (t === e.value) return [e];
  for (let r of e.children) {
    let n = yf(t, r);
    if (n.length) return n.unshift(e), n;
  }
  return [];
}
var ut = class {
  constructor(e, r) {
    (this.value = e), (this.children = r);
  }
  toString() {
    return `TreeNode(${this.value})`;
  }
};
function si(t) {
  let e = {};
  return t && t.children.forEach((r) => (e[r.value.outlet] = r)), e;
}
var hl = class extends fl {
  constructor(e, r) {
    super(e), (this.snapshot = r), Mf(this, e);
  }
  toString() {
    return this.snapshot.toString();
  }
};
function ev(t) {
  let e = KS(t),
    r = new we([new vr("", {})]),
    n = new we({}),
    i = new we({}),
    o = new we({}),
    s = new we(""),
    a = new ft(r, n, o, s, i, F, t, e.root);
  return (a.snapshot = e.root), new hl(new ut(a, []), e);
}
function KS(t) {
  let e = {},
    r = {},
    n = {},
    i = "",
    o = new mo([], e, n, i, r, F, t, null, {});
  return new pl("", new ut(o, []));
}
var ft = class {
  constructor(e, r, n, i, o, s, a, l) {
    (this.urlSubject = e),
      (this.paramsSubject = r),
      (this.queryParamsSubject = n),
      (this.fragmentSubject = i),
      (this.dataSubject = o),
      (this.outlet = s),
      (this.component = a),
      (this._futureSnapshot = l),
      (this.title = this.dataSubject?.pipe(k((c) => c[Do])) ?? A(void 0)),
      (this.url = e),
      (this.params = r),
      (this.queryParams = n),
      (this.fragment = i),
      (this.data = o);
  }
  get routeConfig() {
    return this._futureSnapshot.routeConfig;
  }
  get root() {
    return this._routerState.root;
  }
  get parent() {
    return this._routerState.parent(this);
  }
  get firstChild() {
    return this._routerState.firstChild(this);
  }
  get children() {
    return this._routerState.children(this);
  }
  get pathFromRoot() {
    return this._routerState.pathFromRoot(this);
  }
  get paramMap() {
    return (
      (this._paramMap ??= this.params.pipe(k((e) => ci(e)))), this._paramMap
    );
  }
  get queryParamMap() {
    return (
      (this._queryParamMap ??= this.queryParams.pipe(k((e) => ci(e)))),
      this._queryParamMap
    );
  }
  toString() {
    return this.snapshot
      ? this.snapshot.toString()
      : `Future(${this._futureSnapshot})`;
  }
};
function Sf(t, e, r = "emptyOnly") {
  let n,
    { routeConfig: i } = t;
  return (
    e !== null &&
    (r === "always" ||
      i?.path === "" ||
      (!e.component && !e.routeConfig?.loadComponent))
      ? (n = {
          params: v(v({}, e.params), t.params),
          data: v(v({}, e.data), t.data),
          resolve: v(v(v(v({}, t.data), e.data), i?.data), t._resolvedData),
        })
      : (n = {
          params: v({}, t.params),
          data: v({}, t.data),
          resolve: v(v({}, t.data), t._resolvedData ?? {}),
        }),
    i && nv(i) && (n.resolve[Do] = i.title),
    n
  );
}
var mo = class {
    get title() {
      return this.data?.[Do];
    }
    constructor(e, r, n, i, o, s, a, l, c) {
      (this.url = e),
        (this.params = r),
        (this.queryParams = n),
        (this.fragment = i),
        (this.data = o),
        (this.outlet = s),
        (this.component = a),
        (this.routeConfig = l),
        (this._resolve = c);
    }
    get root() {
      return this._routerState.root;
    }
    get parent() {
      return this._routerState.parent(this);
    }
    get firstChild() {
      return this._routerState.firstChild(this);
    }
    get children() {
      return this._routerState.children(this);
    }
    get pathFromRoot() {
      return this._routerState.pathFromRoot(this);
    }
    get paramMap() {
      return (this._paramMap ??= ci(this.params)), this._paramMap;
    }
    get queryParamMap() {
      return (
        (this._queryParamMap ??= ci(this.queryParams)), this._queryParamMap
      );
    }
    toString() {
      let e = this.url.map((n) => n.toString()).join("/"),
        r = this.routeConfig ? this.routeConfig.path : "";
      return `Route(url:'${e}', path:'${r}')`;
    }
  },
  pl = class extends fl {
    constructor(e, r) {
      super(r), (this.url = e), Mf(this, r);
    }
    toString() {
      return tv(this._root);
    }
  };
function Mf(t, e) {
  (e.value._routerState = t), e.children.forEach((r) => Mf(t, r));
}
function tv(t) {
  let e = t.children.length > 0 ? ` { ${t.children.map(tv).join(", ")} } ` : "";
  return `${t.value}${e}`;
}
function Kd(t) {
  if (t.snapshot) {
    let e = t.snapshot,
      r = t._futureSnapshot;
    (t.snapshot = r),
      Xt(e.queryParams, r.queryParams) ||
        t.queryParamsSubject.next(r.queryParams),
      e.fragment !== r.fragment && t.fragmentSubject.next(r.fragment),
      Xt(e.params, r.params) || t.paramsSubject.next(r.params),
      SS(e.url, r.url) || t.urlSubject.next(r.url),
      Xt(e.data, r.data) || t.dataSubject.next(r.data);
  } else
    (t.snapshot = t._futureSnapshot),
      t.dataSubject.next(t._futureSnapshot.data);
}
function vf(t, e) {
  let r = Xt(t.params, e.params) && AS(t.url, e.url),
    n = !t.parent != !e.parent;
  return r && !n && (!t.parent || vf(t.parent, e.parent));
}
function nv(t) {
  return typeof t.title == "string" || t.title === null;
}
var xf = (() => {
    let e = class e {
      constructor() {
        (this.activated = null),
          (this._activatedRoute = null),
          (this.name = F),
          (this.activateEvents = new pe()),
          (this.deactivateEvents = new pe()),
          (this.attachEvents = new pe()),
          (this.detachEvents = new pe()),
          (this.parentContexts = D(bo)),
          (this.location = D(Zt)),
          (this.changeDetector = D(Un)),
          (this.environmentInjector = D(Qe)),
          (this.inputBinder = D(Dl, { optional: !0 })),
          (this.supportsBindingToComponentInputs = !0);
      }
      get activatedComponentRef() {
        return this.activated;
      }
      ngOnChanges(n) {
        if (n.name) {
          let { firstChange: i, previousValue: o } = n.name;
          if (i) return;
          this.isTrackedInParentContexts(o) &&
            (this.deactivate(), this.parentContexts.onChildOutletDestroyed(o)),
            this.initializeOutletWithName();
        }
      }
      ngOnDestroy() {
        this.isTrackedInParentContexts(this.name) &&
          this.parentContexts.onChildOutletDestroyed(this.name),
          this.inputBinder?.unsubscribeFromRouteData(this);
      }
      isTrackedInParentContexts(n) {
        return this.parentContexts.getContext(n)?.outlet === this;
      }
      ngOnInit() {
        this.initializeOutletWithName();
      }
      initializeOutletWithName() {
        if (
          (this.parentContexts.onChildOutletCreated(this.name, this),
          this.activated)
        )
          return;
        let n = this.parentContexts.getContext(this.name);
        n?.route &&
          (n.attachRef
            ? this.attach(n.attachRef, n.route)
            : this.activateWith(n.route, n.injector));
      }
      get isActivated() {
        return !!this.activated;
      }
      get component() {
        if (!this.activated) throw new _(4012, !1);
        return this.activated.instance;
      }
      get activatedRoute() {
        if (!this.activated) throw new _(4012, !1);
        return this._activatedRoute;
      }
      get activatedRouteData() {
        return this._activatedRoute ? this._activatedRoute.snapshot.data : {};
      }
      detach() {
        if (!this.activated) throw new _(4012, !1);
        this.location.detach();
        let n = this.activated;
        return (
          (this.activated = null),
          (this._activatedRoute = null),
          this.detachEvents.emit(n.instance),
          n
        );
      }
      attach(n, i) {
        (this.activated = n),
          (this._activatedRoute = i),
          this.location.insert(n.hostView),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.attachEvents.emit(n.instance);
      }
      deactivate() {
        if (this.activated) {
          let n = this.component;
          this.activated.destroy(),
            (this.activated = null),
            (this._activatedRoute = null),
            this.deactivateEvents.emit(n);
        }
      }
      activateWith(n, i) {
        if (this.isActivated) throw new _(4013, !1);
        this._activatedRoute = n;
        let o = this.location,
          a = n.snapshot.component,
          l = this.parentContexts.getOrCreateContext(this.name).children,
          c = new Df(n, l, o.injector);
        (this.activated = o.createComponent(a, {
          index: o.length,
          injector: c,
          environmentInjector: i ?? this.environmentInjector,
        })),
          this.changeDetector.markForCheck(),
          this.inputBinder?.bindActivatedRouteToOutletComponent(this),
          this.activateEvents.emit(this.activated.instance);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [["router-outlet"]],
        inputs: { name: "name" },
        outputs: {
          activateEvents: "activate",
          deactivateEvents: "deactivate",
          attachEvents: "attach",
          detachEvents: "detach",
        },
        exportAs: ["outlet"],
        standalone: !0,
        features: [mn],
      }));
    let t = e;
    return t;
  })(),
  Df = class {
    constructor(e, r, n) {
      (this.route = e),
        (this.childContexts = r),
        (this.parent = n),
        (this.__ngOutletInjector = !0);
    }
    get(e, r) {
      return e === ft
        ? this.route
        : e === bo
        ? this.childContexts
        : this.parent.get(e, r);
    }
  },
  Dl = new S(""),
  Fy = (() => {
    let e = class e {
      constructor() {
        this.outletDataSubscriptions = new Map();
      }
      bindActivatedRouteToOutletComponent(n) {
        this.unsubscribeFromRouteData(n), this.subscribeToRouteData(n);
      }
      unsubscribeFromRouteData(n) {
        this.outletDataSubscriptions.get(n)?.unsubscribe(),
          this.outletDataSubscriptions.delete(n);
      }
      subscribeToRouteData(n) {
        let { activatedRoute: i } = n,
          o = Si([i.queryParams, i.params, i.data])
            .pipe(
              Be(
                ([s, a, l], c) => (
                  (l = v(v(v({}, s), a), l)),
                  c === 0 ? A(l) : Promise.resolve(l)
                )
              )
            )
            .subscribe((s) => {
              if (
                !n.isActivated ||
                !n.activatedComponentRef ||
                n.activatedRoute !== i ||
                i.component === null
              ) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              let a = Zm(i.component);
              if (!a) {
                this.unsubscribeFromRouteData(n);
                return;
              }
              for (let { templateName: l } of a.inputs)
                n.activatedComponentRef.setInput(l, s[l]);
            });
        this.outletDataSubscriptions.set(n, o);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function XS(t, e, r) {
  let n = yo(t, e._root, r ? r._root : void 0);
  return new hl(n, e);
}
function yo(t, e, r) {
  if (r && t.shouldReuseRoute(e.value, r.value.snapshot)) {
    let n = r.value;
    n._futureSnapshot = e.value;
    let i = JS(t, e, r);
    return new ut(n, i);
  } else {
    if (t.shouldAttach(e.value)) {
      let o = t.retrieve(e.value);
      if (o !== null) {
        let s = o.route;
        return (
          (s.value._futureSnapshot = e.value),
          (s.children = e.children.map((a) => yo(t, a))),
          s
        );
      }
    }
    let n = eM(e.value),
      i = e.children.map((o) => yo(t, o));
    return new ut(n, i);
  }
}
function JS(t, e, r) {
  return e.children.map((n) => {
    for (let i of r.children)
      if (t.shouldReuseRoute(n.value, i.value.snapshot)) return yo(t, n, i);
    return yo(t, n);
  });
}
function eM(t) {
  return new ft(
    new we(t.url),
    new we(t.params),
    new we(t.queryParams),
    new we(t.fragment),
    new we(t.data),
    t.outlet,
    t.component,
    t
  );
}
var rv = "ngNavigationCancelingError";
function iv(t, e) {
  let { redirectTo: r, navigationBehaviorOptions: n } = ui(e)
      ? { redirectTo: e, navigationBehaviorOptions: void 0 }
      : e,
    i = ov(!1, dt.Redirect);
  return (i.url = r), (i.navigationBehaviorOptions = n), i;
}
function ov(t, e) {
  let r = new Error(`NavigationCancelingError: ${t || ""}`);
  return (r[rv] = !0), (r.cancellationCode = e), r;
}
function tM(t) {
  return sv(t) && ui(t.url);
}
function sv(t) {
  return !!t && t[rv];
}
var nM = (() => {
  let e = class e {};
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["ng-component"]],
      standalone: !0,
      features: [Qi],
      decls: 1,
      vars: 0,
      template: function (i, o) {
        i & 1 && ne(0, "router-outlet");
      },
      dependencies: [xf],
      encapsulation: 2,
    }));
  let t = e;
  return t;
})();
function rM(t, e) {
  return (
    t.providers &&
      !t._injector &&
      (t._injector = ba(t.providers, e, `Route: ${t.path}`)),
    t._injector ?? e
  );
}
function Tf(t) {
  let e = t.children && t.children.map(Tf),
    r = e ? Z(v({}, t), { children: e }) : v({}, t);
  return (
    !r.component &&
      !r.loadComponent &&
      (e || r.loadChildren) &&
      r.outlet &&
      r.outlet !== F &&
      (r.component = nM),
    r
  );
}
function en(t) {
  return t.outlet || F;
}
function iM(t, e) {
  let r = t.filter((n) => en(n) === e);
  return r.push(...t.filter((n) => en(n) !== e)), r;
}
function Co(t) {
  if (!t) return null;
  if (t.routeConfig?._injector) return t.routeConfig._injector;
  for (let e = t.parent; e; e = e.parent) {
    let r = e.routeConfig;
    if (r?._loadedInjector) return r._loadedInjector;
    if (r?._injector) return r._injector;
  }
  return null;
}
var oM = (t, e, r, n) =>
    k(
      (i) => (
        new wf(e, i.targetRouterState, i.currentRouterState, r, n).activate(t),
        i
      )
    ),
  wf = class {
    constructor(e, r, n, i, o) {
      (this.routeReuseStrategy = e),
        (this.futureState = r),
        (this.currState = n),
        (this.forwardEvent = i),
        (this.inputBindingEnabled = o);
    }
    activate(e) {
      let r = this.futureState._root,
        n = this.currState ? this.currState._root : null;
      this.deactivateChildRoutes(r, n, e),
        Kd(this.futureState.root),
        this.activateChildRoutes(r, n, e);
    }
    deactivateChildRoutes(e, r, n) {
      let i = si(r);
      e.children.forEach((o) => {
        let s = o.value.outlet;
        this.deactivateRoutes(o, i[s], n), delete i[s];
      }),
        Object.values(i).forEach((o) => {
          this.deactivateRouteAndItsChildren(o, n);
        });
    }
    deactivateRoutes(e, r, n) {
      let i = e.value,
        o = r ? r.value : null;
      if (i === o)
        if (i.component) {
          let s = n.getContext(i.outlet);
          s && this.deactivateChildRoutes(e, r, s.children);
        } else this.deactivateChildRoutes(e, r, n);
      else o && this.deactivateRouteAndItsChildren(r, n);
    }
    deactivateRouteAndItsChildren(e, r) {
      e.value.component &&
      this.routeReuseStrategy.shouldDetach(e.value.snapshot)
        ? this.detachAndStoreRouteSubtree(e, r)
        : this.deactivateRouteAndOutlet(e, r);
    }
    detachAndStoreRouteSubtree(e, r) {
      let n = r.getContext(e.value.outlet),
        i = n && e.value.component ? n.children : r,
        o = si(e);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
      if (n && n.outlet) {
        let s = n.outlet.detach(),
          a = n.children.onOutletDeactivated();
        this.routeReuseStrategy.store(e.value.snapshot, {
          componentRef: s,
          route: e,
          contexts: a,
        });
      }
    }
    deactivateRouteAndOutlet(e, r) {
      let n = r.getContext(e.value.outlet),
        i = n && e.value.component ? n.children : r,
        o = si(e);
      for (let s of Object.values(o)) this.deactivateRouteAndItsChildren(s, i);
      n &&
        (n.outlet && (n.outlet.deactivate(), n.children.onOutletDeactivated()),
        (n.attachRef = null),
        (n.route = null));
    }
    activateChildRoutes(e, r, n) {
      let i = si(r);
      e.children.forEach((o) => {
        this.activateRoutes(o, i[o.value.outlet], n),
          this.forwardEvent(new pf(o.value.snapshot));
      }),
        e.children.length && this.forwardEvent(new ff(e.value.snapshot));
    }
    activateRoutes(e, r, n) {
      let i = e.value,
        o = r ? r.value : null;
      if ((Kd(i), i === o))
        if (i.component) {
          let s = n.getOrCreateContext(i.outlet);
          this.activateChildRoutes(e, r, s.children);
        } else this.activateChildRoutes(e, r, n);
      else if (i.component) {
        let s = n.getOrCreateContext(i.outlet);
        if (this.routeReuseStrategy.shouldAttach(i.snapshot)) {
          let a = this.routeReuseStrategy.retrieve(i.snapshot);
          this.routeReuseStrategy.store(i.snapshot, null),
            s.children.onOutletReAttached(a.contexts),
            (s.attachRef = a.componentRef),
            (s.route = a.route.value),
            s.outlet && s.outlet.attach(a.componentRef, a.route.value),
            Kd(a.route.value),
            this.activateChildRoutes(e, null, s.children);
        } else {
          let a = Co(i.snapshot);
          (s.attachRef = null),
            (s.route = i),
            (s.injector = a),
            s.outlet && s.outlet.activateWith(i, s.injector),
            this.activateChildRoutes(e, null, s.children);
        }
      } else this.activateChildRoutes(e, null, n);
    }
  },
  gl = class {
    constructor(e) {
      (this.path = e), (this.route = this.path[this.path.length - 1]);
    }
  },
  li = class {
    constructor(e, r) {
      (this.component = e), (this.route = r);
    }
  };
function sM(t, e, r) {
  let n = t._root,
    i = e ? e._root : null;
  return oo(n, i, r, [n.value]);
}
function aM(t) {
  let e = t.routeConfig ? t.routeConfig.canActivateChild : null;
  return !e || e.length === 0 ? null : { node: t, guards: e };
}
function hi(t, e) {
  let r = Symbol(),
    n = e.get(t, r);
  return n === r ? (typeof t == "function" && !Ip(t) ? t : e.get(t)) : n;
}
function oo(
  t,
  e,
  r,
  n,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = si(e);
  return (
    t.children.forEach((s) => {
      lM(s, o[s.value.outlet], r, n.concat([s.value]), i),
        delete o[s.value.outlet];
    }),
    Object.entries(o).forEach(([s, a]) => co(a, r.getContext(s), i)),
    i
  );
}
function lM(
  t,
  e,
  r,
  n,
  i = { canDeactivateChecks: [], canActivateChecks: [] }
) {
  let o = t.value,
    s = e ? e.value : null,
    a = r ? r.getContext(t.value.outlet) : null;
  if (s && o.routeConfig === s.routeConfig) {
    let l = cM(s, o, o.routeConfig.runGuardsAndResolvers);
    l
      ? i.canActivateChecks.push(new gl(n))
      : ((o.data = s.data), (o._resolvedData = s._resolvedData)),
      o.component ? oo(t, e, a ? a.children : null, n, i) : oo(t, e, r, n, i),
      l &&
        a &&
        a.outlet &&
        a.outlet.isActivated &&
        i.canDeactivateChecks.push(new li(a.outlet.component, s));
  } else
    s && co(e, a, i),
      i.canActivateChecks.push(new gl(n)),
      o.component
        ? oo(t, null, a ? a.children : null, n, i)
        : oo(t, null, r, n, i);
  return i;
}
function cM(t, e, r) {
  if (typeof r == "function") return r(t, e);
  switch (r) {
    case "pathParamsChange":
      return !Dr(t.url, e.url);
    case "pathParamsOrQueryParamsChange":
      return !Dr(t.url, e.url) || !Xt(t.queryParams, e.queryParams);
    case "always":
      return !0;
    case "paramsOrQueryParamsChange":
      return !vf(t, e) || !Xt(t.queryParams, e.queryParams);
    case "paramsChange":
    default:
      return !vf(t, e);
  }
}
function co(t, e, r) {
  let n = si(t),
    i = t.value;
  Object.entries(n).forEach(([o, s]) => {
    i.component
      ? e
        ? co(s, e.children.getContext(o), r)
        : co(s, null, r)
      : co(s, e, r);
  }),
    i.component
      ? e && e.outlet && e.outlet.isActivated
        ? r.canDeactivateChecks.push(new li(e.outlet.component, i))
        : r.canDeactivateChecks.push(new li(null, i))
      : r.canDeactivateChecks.push(new li(null, i));
}
function Eo(t) {
  return typeof t == "function";
}
function uM(t) {
  return typeof t == "boolean";
}
function dM(t) {
  return t && Eo(t.canLoad);
}
function fM(t) {
  return t && Eo(t.canActivate);
}
function hM(t) {
  return t && Eo(t.canActivateChild);
}
function pM(t) {
  return t && Eo(t.canDeactivate);
}
function gM(t) {
  return t && Eo(t.canMatch);
}
function av(t) {
  return t instanceof an || t?.name === "EmptyError";
}
var rl = Symbol("INITIAL_VALUE");
function fi() {
  return Be((t) =>
    Si(t.map((e) => e.pipe(cn(1), xi(rl)))).pipe(
      k((e) => {
        for (let r of e)
          if (r !== !0) {
            if (r === rl) return rl;
            if (r === !1 || r instanceof Wn) return r;
          }
        return !0;
      }),
      et((e) => e !== rl),
      cn(1)
    )
  );
}
function mM(t, e) {
  return _e((r) => {
    let {
      targetSnapshot: n,
      currentSnapshot: i,
      guards: { canActivateChecks: o, canDeactivateChecks: s },
    } = r;
    return s.length === 0 && o.length === 0
      ? A(Z(v({}, r), { guardsResult: !0 }))
      : yM(s, n, i, t).pipe(
          _e((a) => (a && uM(a) ? vM(n, o, t, e) : A(a))),
          k((a) => Z(v({}, r), { guardsResult: a }))
        );
  });
}
function yM(t, e, r, n) {
  return ae(t).pipe(
    _e((i) => EM(i.component, i.route, r, e, n)),
    St((i) => i !== !0, !0)
  );
}
function vM(t, e, r, n) {
  return ae(e).pipe(
    ln((i) =>
      Rr(
        wM(i.route.parent, n),
        DM(i.route, n),
        CM(t, i.path, r),
        bM(t, i.route, r)
      )
    ),
    St((i) => i !== !0, !0)
  );
}
function DM(t, e) {
  return t !== null && e && e(new hf(t)), A(!0);
}
function wM(t, e) {
  return t !== null && e && e(new df(t)), A(!0);
}
function bM(t, e, r) {
  let n = e.routeConfig ? e.routeConfig.canActivate : null;
  if (!n || n.length === 0) return A(!0);
  let i = n.map((o) =>
    hs(() => {
      let s = Co(e) ?? r,
        a = hi(o, s),
        l = fM(a) ? a.canActivate(e, t) : Rt(s, () => a(e, t));
      return Zn(l).pipe(St());
    })
  );
  return A(i).pipe(fi());
}
function CM(t, e, r) {
  let n = e[e.length - 1],
    o = e
      .slice(0, e.length - 1)
      .reverse()
      .map((s) => aM(s))
      .filter((s) => s !== null)
      .map((s) =>
        hs(() => {
          let a = s.guards.map((l) => {
            let c = Co(s.node) ?? r,
              u = hi(l, c),
              d = hM(u) ? u.canActivateChild(n, t) : Rt(c, () => u(n, t));
            return Zn(d).pipe(St());
          });
          return A(a).pipe(fi());
        })
      );
  return A(o).pipe(fi());
}
function EM(t, e, r, n, i) {
  let o = e && e.routeConfig ? e.routeConfig.canDeactivate : null;
  if (!o || o.length === 0) return A(!0);
  let s = o.map((a) => {
    let l = Co(e) ?? i,
      c = hi(a, l),
      u = pM(c) ? c.canDeactivate(t, e, r, n) : Rt(l, () => c(t, e, r, n));
    return Zn(u).pipe(St());
  });
  return A(s).pipe(fi());
}
function IM(t, e, r, n) {
  let i = e.canLoad;
  if (i === void 0 || i.length === 0) return A(!0);
  let o = i.map((s) => {
    let a = hi(s, t),
      l = dM(a) ? a.canLoad(e, r) : Rt(t, () => a(e, r));
    return Zn(l);
  });
  return A(o).pipe(fi(), lv(n));
}
function lv(t) {
  return Zl(
    Ae((e) => {
      if (ui(e)) throw iv(t, e);
    }),
    k((e) => e === !0)
  );
}
function _M(t, e, r, n) {
  let i = e.canMatch;
  if (!i || i.length === 0) return A(!0);
  let o = i.map((s) => {
    let a = hi(s, t),
      l = gM(a) ? a.canMatch(e, r) : Rt(t, () => a(e, r));
    return Zn(l);
  });
  return A(o).pipe(fi(), lv(n));
}
var vo = class {
    constructor(e) {
      this.segmentGroup = e || null;
    }
  },
  ml = class extends Error {
    constructor(e) {
      super(), (this.urlTree = e);
    }
  };
function oi(t) {
  return Nr(new vo(t));
}
function SM(t) {
  return Nr(new _(4e3, !1));
}
function MM(t) {
  return Nr(ov(!1, dt.GuardRejected));
}
var bf = class {
    constructor(e, r) {
      (this.urlSerializer = e), (this.urlTree = r);
    }
    lineralizeSegments(e, r) {
      let n = [],
        i = r.root;
      for (;;) {
        if (((n = n.concat(i.segments)), i.numberOfChildren === 0)) return A(n);
        if (i.numberOfChildren > 1 || !i.children[F]) return SM(e.redirectTo);
        i = i.children[F];
      }
    }
    applyRedirectCommands(e, r, n) {
      let i = this.applyRedirectCreateUrlTree(
        r,
        this.urlSerializer.parse(r),
        e,
        n
      );
      if (r.startsWith("/")) throw new ml(i);
      return i;
    }
    applyRedirectCreateUrlTree(e, r, n, i) {
      let o = this.createSegmentGroup(e, r.root, n, i);
      return new Wn(
        o,
        this.createQueryParams(r.queryParams, this.urlTree.queryParams),
        r.fragment
      );
    }
    createQueryParams(e, r) {
      let n = {};
      return (
        Object.entries(e).forEach(([i, o]) => {
          if (typeof o == "string" && o.startsWith(":")) {
            let a = o.substring(1);
            n[i] = r[a];
          } else n[i] = o;
        }),
        n
      );
    }
    createSegmentGroup(e, r, n, i) {
      let o = this.createSegments(e, r.segments, n, i),
        s = {};
      return (
        Object.entries(r.children).forEach(([a, l]) => {
          s[a] = this.createSegmentGroup(e, l, n, i);
        }),
        new ee(o, s)
      );
    }
    createSegments(e, r, n, i) {
      return r.map((o) =>
        o.path.startsWith(":")
          ? this.findPosParam(e, o, i)
          : this.findOrReturn(o, n)
      );
    }
    findPosParam(e, r, n) {
      let i = n[r.path.substring(1)];
      if (!i) throw new _(4001, !1);
      return i;
    }
    findOrReturn(e, r) {
      let n = 0;
      for (let i of r) {
        if (i.path === e.path) return r.splice(n), i;
        n++;
      }
      return e;
    }
  },
  Cf = {
    matched: !1,
    consumedSegments: [],
    remainingSegments: [],
    parameters: {},
    positionalParamSegments: {},
  };
function xM(t, e, r, n, i) {
  let o = Af(t, e, r);
  return o.matched
    ? ((n = rM(e, n)),
      _M(n, e, r, i).pipe(k((s) => (s === !0 ? o : v({}, Cf)))))
    : A(o);
}
function Af(t, e, r) {
  if (e.path === "**") return TM(r);
  if (e.path === "")
    return e.pathMatch === "full" && (t.hasChildren() || r.length > 0)
      ? v({}, Cf)
      : {
          matched: !0,
          consumedSegments: [],
          remainingSegments: r,
          parameters: {},
          positionalParamSegments: {},
        };
  let i = (e.matcher || _S)(r, t, e);
  if (!i) return v({}, Cf);
  let o = {};
  Object.entries(i.posParams ?? {}).forEach(([a, l]) => {
    o[a] = l.path;
  });
  let s =
    i.consumed.length > 0
      ? v(v({}, o), i.consumed[i.consumed.length - 1].parameters)
      : o;
  return {
    matched: !0,
    consumedSegments: i.consumed,
    remainingSegments: r.slice(i.consumed.length),
    parameters: s,
    positionalParamSegments: i.posParams ?? {},
  };
}
function TM(t) {
  return {
    matched: !0,
    parameters: t.length > 0 ? $y(t).parameters : {},
    consumedSegments: t,
    remainingSegments: [],
    positionalParamSegments: {},
  };
}
function Ly(t, e, r, n) {
  return r.length > 0 && RM(t, r, n)
    ? {
        segmentGroup: new ee(e, NM(n, new ee(r, t.children))),
        slicedSegments: [],
      }
    : r.length === 0 && OM(t, r, n)
    ? {
        segmentGroup: new ee(t.segments, AM(t, r, n, t.children)),
        slicedSegments: r,
      }
    : { segmentGroup: new ee(t.segments, t.children), slicedSegments: r };
}
function AM(t, e, r, n) {
  let i = {};
  for (let o of r)
    if (wl(t, e, o) && !n[en(o)]) {
      let s = new ee([], {});
      i[en(o)] = s;
    }
  return v(v({}, n), i);
}
function NM(t, e) {
  let r = {};
  r[F] = e;
  for (let n of t)
    if (n.path === "" && en(n) !== F) {
      let i = new ee([], {});
      r[en(n)] = i;
    }
  return r;
}
function RM(t, e, r) {
  return r.some((n) => wl(t, e, n) && en(n) !== F);
}
function OM(t, e, r) {
  return r.some((n) => wl(t, e, n));
}
function wl(t, e, r) {
  return (t.hasChildren() || e.length > 0) && r.pathMatch === "full"
    ? !1
    : r.path === "";
}
function kM(t, e, r, n) {
  return en(t) !== n && (n === F || !wl(e, r, t)) ? !1 : Af(e, t, r).matched;
}
function PM(t, e, r) {
  return e.length === 0 && !t.children[r];
}
var Ef = class {};
function FM(t, e, r, n, i, o, s = "emptyOnly") {
  return new If(t, e, r, n, i, s, o).recognize();
}
var LM = 31,
  If = class {
    constructor(e, r, n, i, o, s, a) {
      (this.injector = e),
        (this.configLoader = r),
        (this.rootComponentType = n),
        (this.config = i),
        (this.urlTree = o),
        (this.paramsInheritanceStrategy = s),
        (this.urlSerializer = a),
        (this.applyRedirects = new bf(this.urlSerializer, this.urlTree)),
        (this.absoluteRedirectCount = 0),
        (this.allowRedirects = !0);
    }
    noMatchError(e) {
      return new _(4002, `'${e.segmentGroup}'`);
    }
    recognize() {
      let e = Ly(this.urlTree.root, [], [], this.config).segmentGroup;
      return this.match(e).pipe(
        k((r) => {
          let n = new mo(
              [],
              Object.freeze({}),
              Object.freeze(v({}, this.urlTree.queryParams)),
              this.urlTree.fragment,
              {},
              F,
              this.rootComponentType,
              null,
              {}
            ),
            i = new ut(n, r),
            o = new pl("", i),
            s = zS(n, [], this.urlTree.queryParams, this.urlTree.fragment);
          return (
            (s.queryParams = this.urlTree.queryParams),
            (o.url = this.urlSerializer.serialize(s)),
            this.inheritParamsAndData(o._root, null),
            { state: o, tree: s }
          );
        })
      );
    }
    match(e) {
      return this.processSegmentGroup(this.injector, this.config, e, F).pipe(
        Mn((n) => {
          if (n instanceof ml)
            return (this.urlTree = n.urlTree), this.match(n.urlTree.root);
          throw n instanceof vo ? this.noMatchError(n) : n;
        })
      );
    }
    inheritParamsAndData(e, r) {
      let n = e.value,
        i = Sf(n, r, this.paramsInheritanceStrategy);
      (n.params = Object.freeze(i.params)),
        (n.data = Object.freeze(i.data)),
        e.children.forEach((o) => this.inheritParamsAndData(o, n));
    }
    processSegmentGroup(e, r, n, i) {
      return n.segments.length === 0 && n.hasChildren()
        ? this.processChildren(e, r, n)
        : this.processSegment(e, r, n, n.segments, i, !0).pipe(
            k((o) => (o instanceof ut ? [o] : []))
          );
    }
    processChildren(e, r, n) {
      let i = [];
      for (let o of Object.keys(n.children))
        o === "primary" ? i.unshift(o) : i.push(o);
      return ae(i).pipe(
        ln((o) => {
          let s = n.children[o],
            a = iM(r, o);
          return this.processSegmentGroup(e, a, s, o);
        }),
        oc((o, s) => (o.push(...s), o)),
        xn(null),
        ic(),
        _e((o) => {
          if (o === null) return oi(n);
          let s = cv(o);
          return VM(s), A(s);
        })
      );
    }
    processSegment(e, r, n, i, o, s) {
      return ae(r).pipe(
        ln((a) =>
          this.processSegmentAgainstRoute(
            a._injector ?? e,
            r,
            a,
            n,
            i,
            o,
            s
          ).pipe(
            Mn((l) => {
              if (l instanceof vo) return A(null);
              throw l;
            })
          )
        ),
        St((a) => !!a),
        Mn((a) => {
          if (av(a)) return PM(n, i, o) ? A(new Ef()) : oi(n);
          throw a;
        })
      );
    }
    processSegmentAgainstRoute(e, r, n, i, o, s, a) {
      return kM(n, i, o, s)
        ? n.redirectTo === void 0
          ? this.matchSegmentAgainstRoute(e, i, n, o, s)
          : this.allowRedirects && a
          ? this.expandSegmentAgainstRouteUsingRedirect(e, i, r, n, o, s)
          : oi(i)
        : oi(i);
    }
    expandSegmentAgainstRouteUsingRedirect(e, r, n, i, o, s) {
      let {
        matched: a,
        consumedSegments: l,
        positionalParamSegments: c,
        remainingSegments: u,
      } = Af(r, i, o);
      if (!a) return oi(r);
      i.redirectTo.startsWith("/") &&
        (this.absoluteRedirectCount++,
        this.absoluteRedirectCount > LM && (this.allowRedirects = !1));
      let d = this.applyRedirects.applyRedirectCommands(l, i.redirectTo, c);
      return this.applyRedirects
        .lineralizeSegments(i, d)
        .pipe(_e((f) => this.processSegment(e, n, r, f.concat(u), s, !1)));
    }
    matchSegmentAgainstRoute(e, r, n, i, o) {
      let s = xM(r, n, i, e, this.urlSerializer);
      return (
        n.path === "**" && (r.children = {}),
        s.pipe(
          Be((a) =>
            a.matched
              ? ((e = n._injector ?? e),
                this.getChildConfig(e, n, i).pipe(
                  Be(({ routes: l }) => {
                    let c = n._loadedInjector ?? e,
                      {
                        consumedSegments: u,
                        remainingSegments: d,
                        parameters: f,
                      } = a,
                      g = new mo(
                        u,
                        f,
                        Object.freeze(v({}, this.urlTree.queryParams)),
                        this.urlTree.fragment,
                        BM(n),
                        en(n),
                        n.component ?? n._loadedComponent ?? null,
                        n,
                        $M(n)
                      ),
                      { segmentGroup: C, slicedSegments: I } = Ly(r, u, d, l);
                    if (I.length === 0 && C.hasChildren())
                      return this.processChildren(c, l, C).pipe(
                        k((M) => (M === null ? null : new ut(g, M)))
                      );
                    if (l.length === 0 && I.length === 0)
                      return A(new ut(g, []));
                    let x = en(n) === o;
                    return this.processSegment(c, l, C, I, x ? F : o, !0).pipe(
                      k((M) => new ut(g, M instanceof ut ? [M] : []))
                    );
                  })
                ))
              : oi(r)
          )
        )
      );
    }
    getChildConfig(e, r, n) {
      return r.children
        ? A({ routes: r.children, injector: e })
        : r.loadChildren
        ? r._loadedRoutes !== void 0
          ? A({ routes: r._loadedRoutes, injector: r._loadedInjector })
          : IM(e, r, n, this.urlSerializer).pipe(
              _e((i) =>
                i
                  ? this.configLoader.loadChildren(e, r).pipe(
                      Ae((o) => {
                        (r._loadedRoutes = o.routes),
                          (r._loadedInjector = o.injector);
                      })
                    )
                  : MM(r)
              )
            )
        : A({ routes: [], injector: e });
    }
  };
function VM(t) {
  t.sort((e, r) =>
    e.value.outlet === F
      ? -1
      : r.value.outlet === F
      ? 1
      : e.value.outlet.localeCompare(r.value.outlet)
  );
}
function jM(t) {
  let e = t.value.routeConfig;
  return e && e.path === "";
}
function cv(t) {
  let e = [],
    r = new Set();
  for (let n of t) {
    if (!jM(n)) {
      e.push(n);
      continue;
    }
    let i = e.find((o) => n.value.routeConfig === o.value.routeConfig);
    i !== void 0 ? (i.children.push(...n.children), r.add(i)) : e.push(n);
  }
  for (let n of r) {
    let i = cv(n.children);
    e.push(new ut(n.value, i));
  }
  return e.filter((n) => !r.has(n));
}
function BM(t) {
  return t.data || {};
}
function $M(t) {
  return t.resolve || {};
}
function UM(t, e, r, n, i, o) {
  return _e((s) =>
    FM(t, e, r, n, s.extractedUrl, i, o).pipe(
      k(({ state: a, tree: l }) =>
        Z(v({}, s), { targetSnapshot: a, urlAfterRedirects: l })
      )
    )
  );
}
function HM(t, e) {
  return _e((r) => {
    let {
      targetSnapshot: n,
      guards: { canActivateChecks: i },
    } = r;
    if (!i.length) return A(r);
    let o = new Set(i.map((l) => l.route)),
      s = new Set();
    for (let l of o) if (!s.has(l)) for (let c of uv(l)) s.add(c);
    let a = 0;
    return ae(s).pipe(
      ln((l) =>
        o.has(l)
          ? zM(l, n, t, e)
          : ((l.data = Sf(l, l.parent, t).resolve), A(void 0))
      ),
      Ae(() => a++),
      Or(1),
      _e((l) => (a === s.size ? A(r) : Ge))
    );
  });
}
function uv(t) {
  let e = t.children.map((r) => uv(r)).flat();
  return [t, ...e];
}
function zM(t, e, r, n) {
  let i = t.routeConfig,
    o = t._resolve;
  return (
    i?.title !== void 0 && !nv(i) && (o[Do] = i.title),
    WM(o, t, e, n).pipe(
      k(
        (s) => (
          (t._resolvedData = s), (t.data = Sf(t, t.parent, r).resolve), null
        )
      )
    )
  );
}
function WM(t, e, r, n) {
  let i = ef(t);
  if (i.length === 0) return A({});
  let o = {};
  return ae(i).pipe(
    _e((s) =>
      GM(t[s], e, r, n).pipe(
        St(),
        Ae((a) => {
          o[s] = a;
        })
      )
    ),
    Or(1),
    Mi(o),
    Mn((s) => (av(s) ? Ge : Nr(s)))
  );
}
function GM(t, e, r, n) {
  let i = Co(e) ?? n,
    o = hi(t, i),
    s = o.resolve ? o.resolve(e, r) : Rt(i, () => o(e, r));
  return Zn(s);
}
function Xd(t) {
  return Be((e) => {
    let r = t(e);
    return r ? ae(r).pipe(k(() => e)) : A(e);
  });
}
var dv = (() => {
    let e = class e {
      buildTitle(n) {
        let i,
          o = n.root;
        for (; o !== void 0; )
          (i = this.getResolvedTitleForRoute(o) ?? i),
            (o = o.children.find((s) => s.outlet === F));
        return i;
      }
      getResolvedTitleForRoute(n) {
        return n.data[Do];
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: () => D(qM), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  qM = (() => {
    let e = class e extends dv {
      constructor(n) {
        super(), (this.title = n);
      }
      updateTitle(n) {
        let i = this.buildTitle(n);
        i !== void 0 && this.title.setTitle(i);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Ny));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  Io = new S("", { providedIn: "root", factory: () => ({}) }),
  yl = new S(""),
  Nf = (() => {
    let e = class e {
      constructor() {
        (this.componentLoaders = new WeakMap()),
          (this.childrenLoaders = new WeakMap()),
          (this.compiler = D(Na));
      }
      loadComponent(n) {
        if (this.componentLoaders.get(n)) return this.componentLoaders.get(n);
        if (n._loadedComponent) return A(n._loadedComponent);
        this.onLoadStartListener && this.onLoadStartListener(n);
        let i = Zn(n.loadComponent()).pipe(
            k(fv),
            Ae((s) => {
              this.onLoadEndListener && this.onLoadEndListener(n),
                (n._loadedComponent = s);
            }),
            Tn(() => {
              this.componentLoaders.delete(n);
            })
          ),
          o = new Tr(i, () => new me()).pipe(xr());
        return this.componentLoaders.set(n, o), o;
      }
      loadChildren(n, i) {
        if (this.childrenLoaders.get(i)) return this.childrenLoaders.get(i);
        if (i._loadedRoutes)
          return A({ routes: i._loadedRoutes, injector: i._loadedInjector });
        this.onLoadStartListener && this.onLoadStartListener(i);
        let s = ZM(i, this.compiler, n, this.onLoadEndListener).pipe(
            Tn(() => {
              this.childrenLoaders.delete(i);
            })
          ),
          a = new Tr(s, () => new me()).pipe(xr());
        return this.childrenLoaders.set(i, a), a;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
function ZM(t, e, r, n) {
  return Zn(t.loadChildren()).pipe(
    k(fv),
    _e((i) =>
      i instanceof $i || Array.isArray(i) ? A(i) : ae(e.compileModuleAsync(i))
    ),
    k((i) => {
      n && n(t);
      let o,
        s,
        a = !1;
      return (
        Array.isArray(i)
          ? ((s = i), (a = !0))
          : ((o = i.create(r).injector),
            (s = o.get(yl, [], { optional: !0, self: !0 }).flat())),
        { routes: s.map(Tf), injector: o }
      );
    })
  );
}
function QM(t) {
  return t && typeof t == "object" && "default" in t;
}
function fv(t) {
  return QM(t) ? t.default : t;
}
var Rf = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: () => D(YM), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  YM = (() => {
    let e = class e {
      shouldProcessUrl(n) {
        return !0;
      }
      extract(n) {
        return n;
      }
      merge(n, i) {
        return n;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  hv = new S(""),
  pv = new S("");
function KM(t, e, r) {
  let n = t.get(pv),
    i = t.get(Te);
  return t.get(ie).runOutsideAngular(() => {
    if (!i.startViewTransition || n.skipNextTransition)
      return (n.skipNextTransition = !1), Promise.resolve();
    let o,
      s = new Promise((c) => {
        o = c;
      }),
      a = i.startViewTransition(() => (o(), XM(t))),
      { onViewTransitionCreated: l } = n;
    return l && Rt(t, () => l({ transition: a, from: e, to: r })), s;
  });
}
function XM(t) {
  return new Promise((e) => {
    od(e, { injector: t });
  });
}
var Of = (() => {
  let e = class e {
    get hasRequestedNavigation() {
      return this.navigationId !== 0;
    }
    constructor() {
      (this.currentNavigation = null),
        (this.currentTransition = null),
        (this.lastSuccessfulNavigation = null),
        (this.events = new me()),
        (this.transitionAbortSubject = new me()),
        (this.configLoader = D(Nf)),
        (this.environmentInjector = D(Qe)),
        (this.urlSerializer = D(wo)),
        (this.rootContexts = D(bo)),
        (this.location = D(ni)),
        (this.inputBindingEnabled = D(Dl, { optional: !0 }) !== null),
        (this.titleStrategy = D(dv)),
        (this.options = D(Io, { optional: !0 }) || {}),
        (this.paramsInheritanceStrategy =
          this.options.paramsInheritanceStrategy || "emptyOnly"),
        (this.urlHandlingStrategy = D(Rf)),
        (this.createViewTransition = D(hv, { optional: !0 })),
        (this.navigationId = 0),
        (this.afterPreactivation = () => A(void 0)),
        (this.rootComponentType = null);
      let n = (o) => this.events.next(new cf(o)),
        i = (o) => this.events.next(new uf(o));
      (this.configLoader.onLoadEndListener = i),
        (this.configLoader.onLoadStartListener = n);
    }
    complete() {
      this.transitions?.complete();
    }
    handleNavigationRequest(n) {
      let i = ++this.navigationId;
      this.transitions?.next(Z(v(v({}, this.transitions.value), n), { id: i }));
    }
    setupNavigations(n, i, o) {
      return (
        (this.transitions = new we({
          id: 0,
          currentUrlTree: i,
          currentRawUrl: i,
          extractedUrl: this.urlHandlingStrategy.extract(i),
          urlAfterRedirects: this.urlHandlingStrategy.extract(i),
          rawUrl: i,
          extras: {},
          resolve: null,
          reject: null,
          promise: Promise.resolve(!0),
          source: lo,
          restoredState: null,
          currentSnapshot: o.snapshot,
          targetSnapshot: null,
          currentRouterState: o,
          targetRouterState: null,
          guards: { canActivateChecks: [], canDeactivateChecks: [] },
          guardsResult: null,
        })),
        this.transitions.pipe(
          et((s) => s.id !== 0),
          k((s) =>
            Z(v({}, s), {
              extractedUrl: this.urlHandlingStrategy.extract(s.rawUrl),
            })
          ),
          Be((s) => {
            let a = !1,
              l = !1;
            return A(s).pipe(
              Be((c) => {
                if (this.navigationId > s.id)
                  return (
                    this.cancelNavigationTransition(
                      s,
                      "",
                      dt.SupersededByNewNavigation
                    ),
                    Ge
                  );
                (this.currentTransition = s),
                  (this.currentNavigation = {
                    id: c.id,
                    initialUrl: c.rawUrl,
                    extractedUrl: c.extractedUrl,
                    trigger: c.source,
                    extras: c.extras,
                    previousNavigation: this.lastSuccessfulNavigation
                      ? Z(v({}, this.lastSuccessfulNavigation), {
                          previousNavigation: null,
                        })
                      : null,
                  });
                let u =
                    !n.navigated ||
                    this.isUpdatingInternalState() ||
                    this.isUpdatedBrowserUrl(),
                  d = c.extras.onSameUrlNavigation ?? n.onSameUrlNavigation;
                if (!u && d !== "reload") {
                  let f = "";
                  return (
                    this.events.next(
                      new qn(
                        c.id,
                        this.urlSerializer.serialize(c.rawUrl),
                        f,
                        cl.IgnoredSameUrlNavigation
                      )
                    ),
                    c.resolve(null),
                    Ge
                  );
                }
                if (this.urlHandlingStrategy.shouldProcessUrl(c.rawUrl))
                  return A(c).pipe(
                    Be((f) => {
                      let g = this.transitions?.getValue();
                      return (
                        this.events.next(
                          new di(
                            f.id,
                            this.urlSerializer.serialize(f.extractedUrl),
                            f.source,
                            f.restoredState
                          )
                        ),
                        g !== this.transitions?.getValue()
                          ? Ge
                          : Promise.resolve(f)
                      );
                    }),
                    UM(
                      this.environmentInjector,
                      this.configLoader,
                      this.rootComponentType,
                      n.config,
                      this.urlSerializer,
                      this.paramsInheritanceStrategy
                    ),
                    Ae((f) => {
                      (s.targetSnapshot = f.targetSnapshot),
                        (s.urlAfterRedirects = f.urlAfterRedirects),
                        (this.currentNavigation = Z(
                          v({}, this.currentNavigation),
                          { finalUrl: f.urlAfterRedirects }
                        ));
                      let g = new ul(
                        f.id,
                        this.urlSerializer.serialize(f.extractedUrl),
                        this.urlSerializer.serialize(f.urlAfterRedirects),
                        f.targetSnapshot
                      );
                      this.events.next(g);
                    })
                  );
                if (
                  u &&
                  this.urlHandlingStrategy.shouldProcessUrl(c.currentRawUrl)
                ) {
                  let {
                      id: f,
                      extractedUrl: g,
                      source: C,
                      restoredState: I,
                      extras: x,
                    } = c,
                    M = new di(f, this.urlSerializer.serialize(g), C, I);
                  this.events.next(M);
                  let ge = ev(this.rootComponentType).snapshot;
                  return (
                    (this.currentTransition = s =
                      Z(v({}, c), {
                        targetSnapshot: ge,
                        urlAfterRedirects: g,
                        extras: Z(v({}, x), {
                          skipLocationChange: !1,
                          replaceUrl: !1,
                        }),
                      })),
                    (this.currentNavigation.finalUrl = g),
                    A(s)
                  );
                } else {
                  let f = "";
                  return (
                    this.events.next(
                      new qn(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        f,
                        cl.IgnoredByUrlHandlingStrategy
                      )
                    ),
                    c.resolve(null),
                    Ge
                  );
                }
              }),
              Ae((c) => {
                let u = new of(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot
                );
                this.events.next(u);
              }),
              k(
                (c) => (
                  (this.currentTransition = s =
                    Z(v({}, c), {
                      guards: sM(
                        c.targetSnapshot,
                        c.currentSnapshot,
                        this.rootContexts
                      ),
                    })),
                  s
                )
              ),
              mM(this.environmentInjector, (c) => this.events.next(c)),
              Ae((c) => {
                if (((s.guardsResult = c.guardsResult), ui(c.guardsResult)))
                  throw iv(this.urlSerializer, c.guardsResult);
                let u = new sf(
                  c.id,
                  this.urlSerializer.serialize(c.extractedUrl),
                  this.urlSerializer.serialize(c.urlAfterRedirects),
                  c.targetSnapshot,
                  !!c.guardsResult
                );
                this.events.next(u);
              }),
              et((c) =>
                c.guardsResult
                  ? !0
                  : (this.cancelNavigationTransition(c, "", dt.GuardRejected),
                    !1)
              ),
              Xd((c) => {
                if (c.guards.canActivateChecks.length)
                  return A(c).pipe(
                    Ae((u) => {
                      let d = new af(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(d);
                    }),
                    Be((u) => {
                      let d = !1;
                      return A(u).pipe(
                        HM(
                          this.paramsInheritanceStrategy,
                          this.environmentInjector
                        ),
                        Ae({
                          next: () => (d = !0),
                          complete: () => {
                            d ||
                              this.cancelNavigationTransition(
                                u,
                                "",
                                dt.NoDataFromResolver
                              );
                          },
                        })
                      );
                    }),
                    Ae((u) => {
                      let d = new lf(
                        u.id,
                        this.urlSerializer.serialize(u.extractedUrl),
                        this.urlSerializer.serialize(u.urlAfterRedirects),
                        u.targetSnapshot
                      );
                      this.events.next(d);
                    })
                  );
              }),
              Xd((c) => {
                let u = (d) => {
                  let f = [];
                  d.routeConfig?.loadComponent &&
                    !d.routeConfig._loadedComponent &&
                    f.push(
                      this.configLoader.loadComponent(d.routeConfig).pipe(
                        Ae((g) => {
                          d.component = g;
                        }),
                        k(() => {})
                      )
                    );
                  for (let g of d.children) f.push(...u(g));
                  return f;
                };
                return Si(u(c.targetSnapshot.root)).pipe(xn(null), cn(1));
              }),
              Xd(() => this.afterPreactivation()),
              Be(() => {
                let { currentSnapshot: c, targetSnapshot: u } = s,
                  d = this.createViewTransition?.(
                    this.environmentInjector,
                    c.root,
                    u.root
                  );
                return d ? ae(d).pipe(k(() => s)) : A(s);
              }),
              k((c) => {
                let u = XS(
                  n.routeReuseStrategy,
                  c.targetSnapshot,
                  c.currentRouterState
                );
                return (
                  (this.currentTransition = s =
                    Z(v({}, c), { targetRouterState: u })),
                  (this.currentNavigation.targetRouterState = u),
                  s
                );
              }),
              Ae(() => {
                this.events.next(new po());
              }),
              oM(
                this.rootContexts,
                n.routeReuseStrategy,
                (c) => this.events.next(c),
                this.inputBindingEnabled
              ),
              cn(1),
              Ae({
                next: (c) => {
                  (a = !0),
                    (this.lastSuccessfulNavigation = this.currentNavigation),
                    this.events.next(
                      new Jt(
                        c.id,
                        this.urlSerializer.serialize(c.extractedUrl),
                        this.urlSerializer.serialize(c.urlAfterRedirects)
                      )
                    ),
                    this.titleStrategy?.updateTitle(
                      c.targetRouterState.snapshot
                    ),
                    c.resolve(!0);
                },
                complete: () => {
                  a = !0;
                },
              }),
              Ti(
                this.transitionAbortSubject.pipe(
                  Ae((c) => {
                    throw c;
                  })
                )
              ),
              Tn(() => {
                !a &&
                  !l &&
                  this.cancelNavigationTransition(
                    s,
                    "",
                    dt.SupersededByNewNavigation
                  ),
                  this.currentTransition?.id === s.id &&
                    ((this.currentNavigation = null),
                    (this.currentTransition = null));
              }),
              Mn((c) => {
                if (((l = !0), sv(c)))
                  this.events.next(
                    new Gn(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      c.message,
                      c.cancellationCode
                    )
                  ),
                    tM(c) ? this.events.next(new go(c.url)) : s.resolve(!1);
                else {
                  this.events.next(
                    new ho(
                      s.id,
                      this.urlSerializer.serialize(s.extractedUrl),
                      c,
                      s.targetSnapshot ?? void 0
                    )
                  );
                  try {
                    s.resolve(n.errorHandler(c));
                  } catch (u) {
                    this.options.resolveNavigationPromiseOnError
                      ? s.resolve(!1)
                      : s.reject(u);
                  }
                }
                return Ge;
              })
            );
          })
        )
      );
    }
    cancelNavigationTransition(n, i, o) {
      let s = new Gn(n.id, this.urlSerializer.serialize(n.extractedUrl), i, o);
      this.events.next(s), n.resolve(!1);
    }
    isUpdatingInternalState() {
      return (
        this.currentTransition?.extractedUrl.toString() !==
        this.currentTransition?.currentUrlTree.toString()
      );
    }
    isUpdatedBrowserUrl() {
      return (
        this.urlHandlingStrategy
          .extract(this.urlSerializer.parse(this.location.path(!0)))
          .toString() !== this.currentTransition?.extractedUrl.toString() &&
        !this.currentTransition?.extras.skipLocationChange
      );
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function JM(t) {
  return t !== lo;
}
var ex = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: () => D(tx), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  _f = class {
    shouldDetach(e) {
      return !1;
    }
    store(e, r) {}
    shouldAttach(e) {
      return !1;
    }
    retrieve(e) {
      return null;
    }
    shouldReuseRoute(e, r) {
      return e.routeConfig === r.routeConfig;
    }
  },
  tx = (() => {
    let e = class e extends _f {};
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = Vn(e)))(o || e);
      };
    })()),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  gv = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: () => D(nx), providedIn: "root" }));
    let t = e;
    return t;
  })(),
  nx = (() => {
    let e = class e extends gv {
      constructor() {
        super(...arguments),
          (this.location = D(ni)),
          (this.urlSerializer = D(wo)),
          (this.options = D(Io, { optional: !0 }) || {}),
          (this.canceledNavigationResolution =
            this.options.canceledNavigationResolution || "replace"),
          (this.urlHandlingStrategy = D(Rf)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.currentUrlTree = new Wn()),
          (this.rawUrlTree = this.currentUrlTree),
          (this.currentPageId = 0),
          (this.lastSuccessfulId = -1),
          (this.routerState = ev(null)),
          (this.stateMemento = this.createStateMemento());
      }
      getCurrentUrlTree() {
        return this.currentUrlTree;
      }
      getRawUrlTree() {
        return this.rawUrlTree;
      }
      restoredState() {
        return this.location.getState();
      }
      get browserPageId() {
        return this.canceledNavigationResolution !== "computed"
          ? this.currentPageId
          : this.restoredState()?.ɵrouterPageId ?? this.currentPageId;
      }
      getRouterState() {
        return this.routerState;
      }
      createStateMemento() {
        return {
          rawUrlTree: this.rawUrlTree,
          currentUrlTree: this.currentUrlTree,
          routerState: this.routerState,
        };
      }
      registerNonRouterCurrentEntryChangeListener(n) {
        return this.location.subscribe((i) => {
          i.type === "popstate" && n(i.url, i.state);
        });
      }
      handleRouterEvent(n, i) {
        if (n instanceof di) this.stateMemento = this.createStateMemento();
        else if (n instanceof qn) this.rawUrlTree = i.initialUrl;
        else if (n instanceof ul) {
          if (
            this.urlUpdateStrategy === "eager" &&
            !i.extras.skipLocationChange
          ) {
            let o = this.urlHandlingStrategy.merge(i.finalUrl, i.initialUrl);
            this.setBrowserUrl(o, i);
          }
        } else
          n instanceof po
            ? ((this.currentUrlTree = i.finalUrl),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                i.finalUrl,
                i.initialUrl
              )),
              (this.routerState = i.targetRouterState),
              this.urlUpdateStrategy === "deferred" &&
                (i.extras.skipLocationChange ||
                  this.setBrowserUrl(this.rawUrlTree, i)))
            : n instanceof Gn &&
              (n.code === dt.GuardRejected || n.code === dt.NoDataFromResolver)
            ? this.restoreHistory(i)
            : n instanceof ho
            ? this.restoreHistory(i, !0)
            : n instanceof Jt &&
              ((this.lastSuccessfulId = n.id),
              (this.currentPageId = this.browserPageId));
      }
      setBrowserUrl(n, i) {
        let o = this.urlSerializer.serialize(n);
        if (this.location.isCurrentPathEqualTo(o) || i.extras.replaceUrl) {
          let s = this.browserPageId,
            a = v(v({}, i.extras.state), this.generateNgRouterState(i.id, s));
          this.location.replaceState(o, "", a);
        } else {
          let s = v(
            v({}, i.extras.state),
            this.generateNgRouterState(i.id, this.browserPageId + 1)
          );
          this.location.go(o, "", s);
        }
      }
      restoreHistory(n, i = !1) {
        if (this.canceledNavigationResolution === "computed") {
          let o = this.browserPageId,
            s = this.currentPageId - o;
          s !== 0
            ? this.location.historyGo(s)
            : this.currentUrlTree === n.finalUrl &&
              s === 0 &&
              (this.resetState(n), this.resetUrlToCurrentUrlTree());
        } else
          this.canceledNavigationResolution === "replace" &&
            (i && this.resetState(n), this.resetUrlToCurrentUrlTree());
      }
      resetState(n) {
        (this.routerState = this.stateMemento.routerState),
          (this.currentUrlTree = this.stateMemento.currentUrlTree),
          (this.rawUrlTree = this.urlHandlingStrategy.merge(
            this.currentUrlTree,
            n.finalUrl ?? this.rawUrlTree
          ));
      }
      resetUrlToCurrentUrlTree() {
        this.location.replaceState(
          this.urlSerializer.serialize(this.rawUrlTree),
          "",
          this.generateNgRouterState(this.lastSuccessfulId, this.currentPageId)
        );
      }
      generateNgRouterState(n, i) {
        return this.canceledNavigationResolution === "computed"
          ? { navigationId: n, ɵrouterPageId: i }
          : { navigationId: n };
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = Vn(e)))(o || e);
      };
    })()),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  so = (function (t) {
    return (
      (t[(t.COMPLETE = 0)] = "COMPLETE"),
      (t[(t.FAILED = 1)] = "FAILED"),
      (t[(t.REDIRECTING = 2)] = "REDIRECTING"),
      t
    );
  })(so || {});
function mv(t, e) {
  t.events
    .pipe(
      et(
        (r) =>
          r instanceof Jt ||
          r instanceof Gn ||
          r instanceof ho ||
          r instanceof qn
      ),
      k((r) =>
        r instanceof Jt || r instanceof qn
          ? so.COMPLETE
          : (
              r instanceof Gn
                ? r.code === dt.Redirect ||
                  r.code === dt.SupersededByNewNavigation
                : !1
            )
          ? so.REDIRECTING
          : so.FAILED
      ),
      et((r) => r !== so.REDIRECTING),
      cn(1)
    )
    .subscribe(() => {
      e();
    });
}
function rx(t) {
  throw t;
}
var ix = {
    paths: "exact",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "exact",
  },
  ox = {
    paths: "subset",
    fragment: "ignored",
    matrixParams: "ignored",
    queryParams: "subset",
  },
  ve = (() => {
    let e = class e {
      get currentUrlTree() {
        return this.stateManager.getCurrentUrlTree();
      }
      get rawUrlTree() {
        return this.stateManager.getRawUrlTree();
      }
      get events() {
        return this._events;
      }
      get routerState() {
        return this.stateManager.getRouterState();
      }
      constructor() {
        (this.disposed = !1),
          (this.isNgZoneEnabled = !1),
          (this.console = D(Sa)),
          (this.stateManager = D(gv)),
          (this.options = D(Io, { optional: !0 }) || {}),
          (this.pendingTasks = D(hr)),
          (this.urlUpdateStrategy =
            this.options.urlUpdateStrategy || "deferred"),
          (this.navigationTransitions = D(Of)),
          (this.urlSerializer = D(wo)),
          (this.location = D(ni)),
          (this.urlHandlingStrategy = D(Rf)),
          (this._events = new me()),
          (this.errorHandler = this.options.errorHandler || rx),
          (this.navigated = !1),
          (this.routeReuseStrategy = D(ex)),
          (this.onSameUrlNavigation =
            this.options.onSameUrlNavigation || "ignore"),
          (this.config = D(yl, { optional: !0 })?.flat() ?? []),
          (this.componentInputBindingEnabled = !!D(Dl, { optional: !0 })),
          (this.eventsSubscription = new De()),
          (this.isNgZoneEnabled = D(ie) instanceof ie && ie.isInAngularZone()),
          this.resetConfig(this.config),
          this.navigationTransitions
            .setupNavigations(this, this.currentUrlTree, this.routerState)
            .subscribe({
              error: (n) => {
                this.console.warn(n);
              },
            }),
          this.subscribeToNavigationEvents();
      }
      subscribeToNavigationEvents() {
        let n = this.navigationTransitions.events.subscribe((i) => {
          try {
            let o = this.navigationTransitions.currentTransition,
              s = this.navigationTransitions.currentNavigation;
            if (o !== null && s !== null) {
              if (
                (this.stateManager.handleRouterEvent(i, s),
                i instanceof Gn &&
                  i.code !== dt.Redirect &&
                  i.code !== dt.SupersededByNewNavigation)
              )
                this.navigated = !0;
              else if (i instanceof Jt) this.navigated = !0;
              else if (i instanceof go) {
                let a = this.urlHandlingStrategy.merge(i.url, o.currentRawUrl),
                  l = {
                    info: o.extras.info,
                    skipLocationChange: o.extras.skipLocationChange,
                    replaceUrl:
                      this.urlUpdateStrategy === "eager" || JM(o.source),
                  };
                this.scheduleNavigation(a, lo, null, l, {
                  resolve: o.resolve,
                  reject: o.reject,
                  promise: o.promise,
                });
              }
            }
            ax(i) && this._events.next(i);
          } catch (o) {
            this.navigationTransitions.transitionAbortSubject.next(o);
          }
        });
        this.eventsSubscription.add(n);
      }
      resetRootComponentType(n) {
        (this.routerState.root.component = n),
          (this.navigationTransitions.rootComponentType = n);
      }
      initialNavigation() {
        this.setUpLocationChangeListener(),
          this.navigationTransitions.hasRequestedNavigation ||
            this.navigateToSyncWithBrowser(
              this.location.path(!0),
              lo,
              this.stateManager.restoredState()
            );
      }
      setUpLocationChangeListener() {
        this.nonRouterCurrentEntryChangeSubscription ??=
          this.stateManager.registerNonRouterCurrentEntryChangeListener(
            (n, i) => {
              setTimeout(() => {
                this.navigateToSyncWithBrowser(n, "popstate", i);
              }, 0);
            }
          );
      }
      navigateToSyncWithBrowser(n, i, o) {
        let s = { replaceUrl: !0 },
          a = o?.navigationId ? o : null;
        if (o) {
          let c = v({}, o);
          delete c.navigationId,
            delete c.ɵrouterPageId,
            Object.keys(c).length !== 0 && (s.state = c);
        }
        let l = this.parseUrl(n);
        this.scheduleNavigation(l, i, a, s);
      }
      get url() {
        return this.serializeUrl(this.currentUrlTree);
      }
      getCurrentNavigation() {
        return this.navigationTransitions.currentNavigation;
      }
      get lastSuccessfulNavigation() {
        return this.navigationTransitions.lastSuccessfulNavigation;
      }
      resetConfig(n) {
        (this.config = n.map(Tf)), (this.navigated = !1);
      }
      ngOnDestroy() {
        this.dispose();
      }
      dispose() {
        this.navigationTransitions.complete(),
          this.nonRouterCurrentEntryChangeSubscription &&
            (this.nonRouterCurrentEntryChangeSubscription.unsubscribe(),
            (this.nonRouterCurrentEntryChangeSubscription = void 0)),
          (this.disposed = !0),
          this.eventsSubscription.unsubscribe();
      }
      createUrlTree(n, i = {}) {
        let {
            relativeTo: o,
            queryParams: s,
            fragment: a,
            queryParamsHandling: l,
            preserveFragment: c,
          } = i,
          u = c ? this.currentUrlTree.fragment : a,
          d = null;
        switch (l) {
          case "merge":
            d = v(v({}, this.currentUrlTree.queryParams), s);
            break;
          case "preserve":
            d = this.currentUrlTree.queryParams;
            break;
          default:
            d = s || null;
        }
        d !== null && (d = this.removeEmptyProps(d));
        let f;
        try {
          let g = o ? o.snapshot : this.routerState.snapshot.root;
          f = Yy(g);
        } catch {
          (typeof n[0] != "string" || !n[0].startsWith("/")) && (n = []),
            (f = this.currentUrlTree.root);
        }
        return Ky(f, n, d, u ?? null);
      }
      navigateByUrl(n, i = { skipLocationChange: !1 }) {
        let o = ui(n) ? n : this.parseUrl(n),
          s = this.urlHandlingStrategy.merge(o, this.rawUrlTree);
        return this.scheduleNavigation(s, lo, null, i);
      }
      navigate(n, i = { skipLocationChange: !1 }) {
        return sx(n), this.navigateByUrl(this.createUrlTree(n, i), i);
      }
      serializeUrl(n) {
        return this.urlSerializer.serialize(n);
      }
      parseUrl(n) {
        try {
          return this.urlSerializer.parse(n);
        } catch {
          return this.urlSerializer.parse("/");
        }
      }
      isActive(n, i) {
        let o;
        if (
          (i === !0 ? (o = v({}, ix)) : i === !1 ? (o = v({}, ox)) : (o = i),
          ui(n))
        )
          return Ry(this.currentUrlTree, n, o);
        let s = this.parseUrl(n);
        return Ry(this.currentUrlTree, s, o);
      }
      removeEmptyProps(n) {
        return Object.entries(n).reduce(
          (i, [o, s]) => (s != null && (i[o] = s), i),
          {}
        );
      }
      scheduleNavigation(n, i, o, s, a) {
        if (this.disposed) return Promise.resolve(!1);
        let l, c, u;
        a
          ? ((l = a.resolve), (c = a.reject), (u = a.promise))
          : (u = new Promise((f, g) => {
              (l = f), (c = g);
            }));
        let d = this.pendingTasks.add();
        return (
          mv(this, () => {
            queueMicrotask(() => this.pendingTasks.remove(d));
          }),
          this.navigationTransitions.handleNavigationRequest({
            source: i,
            restoredState: o,
            currentUrlTree: this.currentUrlTree,
            currentRawUrl: this.currentUrlTree,
            rawUrl: n,
            extras: s,
            resolve: l,
            reject: c,
            promise: u,
            currentSnapshot: this.routerState.snapshot,
            currentRouterState: this.routerState,
          }),
          u.catch((f) => Promise.reject(f))
        );
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })();
function sx(t) {
  for (let e = 0; e < t.length; e++) if (t[e] == null) throw new _(4008, !1);
}
function ax(t) {
  return !(t instanceof po) && !(t instanceof go);
}
var Qn = (() => {
  let e = class e {
    constructor(n, i, o, s, a, l) {
      (this.router = n),
        (this.route = i),
        (this.tabIndexAttribute = o),
        (this.renderer = s),
        (this.el = a),
        (this.locationStrategy = l),
        (this.href = null),
        (this.commands = null),
        (this.onChanges = new me()),
        (this.preserveFragment = !1),
        (this.skipLocationChange = !1),
        (this.replaceUrl = !1);
      let c = a.nativeElement.tagName?.toLowerCase();
      (this.isAnchorElement = c === "a" || c === "area"),
        this.isAnchorElement
          ? (this.subscription = n.events.subscribe((u) => {
              u instanceof Jt && this.updateHref();
            }))
          : this.setTabIndexIfNotOnNativeEl("0");
    }
    setTabIndexIfNotOnNativeEl(n) {
      this.tabIndexAttribute != null ||
        this.isAnchorElement ||
        this.applyAttributeValue("tabindex", n);
    }
    ngOnChanges(n) {
      this.isAnchorElement && this.updateHref(), this.onChanges.next(this);
    }
    set routerLink(n) {
      n != null
        ? ((this.commands = Array.isArray(n) ? n : [n]),
          this.setTabIndexIfNotOnNativeEl("0"))
        : ((this.commands = null), this.setTabIndexIfNotOnNativeEl(null));
    }
    onClick(n, i, o, s, a) {
      let l = this.urlTree;
      if (
        l === null ||
        (this.isAnchorElement &&
          (n !== 0 ||
            i ||
            o ||
            s ||
            a ||
            (typeof this.target == "string" && this.target != "_self")))
      )
        return !0;
      let c = {
        skipLocationChange: this.skipLocationChange,
        replaceUrl: this.replaceUrl,
        state: this.state,
        info: this.info,
      };
      return this.router.navigateByUrl(l, c), !this.isAnchorElement;
    }
    ngOnDestroy() {
      this.subscription?.unsubscribe();
    }
    updateHref() {
      let n = this.urlTree;
      this.href =
        n !== null && this.locationStrategy
          ? this.locationStrategy?.prepareExternalUrl(
              this.router.serializeUrl(n)
            )
          : null;
      let i =
        this.href === null
          ? null
          : Wg(this.href, this.el.nativeElement.tagName.toLowerCase(), "href");
      this.applyAttributeValue("href", i);
    }
    applyAttributeValue(n, i) {
      let o = this.renderer,
        s = this.el.nativeElement;
      i !== null ? o.setAttribute(s, n, i) : o.removeAttribute(s, n);
    }
    get urlTree() {
      return this.commands === null
        ? null
        : this.router.createUrlTree(this.commands, {
            relativeTo:
              this.relativeTo !== void 0 ? this.relativeTo : this.route,
            queryParams: this.queryParams,
            fragment: this.fragment,
            queryParamsHandling: this.queryParamsHandling,
            preserveFragment: this.preserveFragment,
          });
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(ve), w(ft), $u("tabindex"), w(qt), w($e), w(Cn));
  }),
    (e.ɵdir = Ce({
      type: e,
      selectors: [["", "routerLink", ""]],
      hostVars: 1,
      hostBindings: function (i, o) {
        i & 1 &&
          z("click", function (a) {
            return o.onClick(
              a.button,
              a.ctrlKey,
              a.shiftKey,
              a.altKey,
              a.metaKey
            );
          }),
          i & 2 && Ca("target", o.target);
      },
      inputs: {
        target: "target",
        queryParams: "queryParams",
        fragment: "fragment",
        queryParamsHandling: "queryParamsHandling",
        state: "state",
        info: "info",
        relativeTo: "relativeTo",
        preserveFragment: [
          Fe.HasDecoratorInputTransform,
          "preserveFragment",
          "preserveFragment",
          mr,
        ],
        skipLocationChange: [
          Fe.HasDecoratorInputTransform,
          "skipLocationChange",
          "skipLocationChange",
          mr,
        ],
        replaceUrl: [
          Fe.HasDecoratorInputTransform,
          "replaceUrl",
          "replaceUrl",
          mr,
        ],
        routerLink: "routerLink",
      },
      standalone: !0,
      features: [ld, mn],
    }));
  let t = e;
  return t;
})();
var vl = class {};
var lx = (() => {
    let e = class e {
      constructor(n, i, o, s, a) {
        (this.router = n),
          (this.injector = o),
          (this.preloadingStrategy = s),
          (this.loader = a);
      }
      setUpPreloading() {
        this.subscription = this.router.events
          .pipe(
            et((n) => n instanceof Jt),
            ln(() => this.preload())
          )
          .subscribe(() => {});
      }
      preload() {
        return this.processRoutes(this.injector, this.router.config);
      }
      ngOnDestroy() {
        this.subscription && this.subscription.unsubscribe();
      }
      processRoutes(n, i) {
        let o = [];
        for (let s of i) {
          s.providers &&
            !s._injector &&
            (s._injector = ba(s.providers, n, `Route: ${s.path}`));
          let a = s._injector ?? n,
            l = s._loadedInjector ?? a;
          ((s.loadChildren && !s._loadedRoutes && s.canLoad === void 0) ||
            (s.loadComponent && !s._loadedComponent)) &&
            o.push(this.preloadConfig(a, s)),
            (s.children || s._loadedRoutes) &&
              o.push(this.processRoutes(l, s.children ?? s._loadedRoutes));
        }
        return ae(o).pipe(Sn());
      }
      preloadConfig(n, i) {
        return this.preloadingStrategy.preload(i, () => {
          let o;
          i.loadChildren && i.canLoad === void 0
            ? (o = this.loader.loadChildren(n, i))
            : (o = A(null));
          let s = o.pipe(
            _e((a) =>
              a === null
                ? A(void 0)
                : ((i._loadedRoutes = a.routes),
                  (i._loadedInjector = a.injector),
                  this.processRoutes(a.injector ?? n, a.routes))
            )
          );
          if (i.loadComponent && !i._loadedComponent) {
            let a = this.loader.loadComponent(i);
            return ae([s, a]).pipe(Sn());
          } else return s;
        });
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(ve), b(Na), b(Qe), b(vl), b(Nf));
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
    let t = e;
    return t;
  })(),
  yv = new S(""),
  cx = (() => {
    let e = class e {
      constructor(n, i, o, s, a = {}) {
        (this.urlSerializer = n),
          (this.transitions = i),
          (this.viewportScroller = o),
          (this.zone = s),
          (this.options = a),
          (this.lastId = 0),
          (this.lastSource = "imperative"),
          (this.restoredId = 0),
          (this.store = {}),
          (a.scrollPositionRestoration ||= "disabled"),
          (a.anchorScrolling ||= "disabled");
      }
      init() {
        this.options.scrollPositionRestoration !== "disabled" &&
          this.viewportScroller.setHistoryScrollRestoration("manual"),
          (this.routerEventsSubscription = this.createScrollEvents()),
          (this.scrollEventsSubscription = this.consumeScrollEvents());
      }
      createScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof di
            ? ((this.store[this.lastId] =
                this.viewportScroller.getScrollPosition()),
              (this.lastSource = n.navigationTrigger),
              (this.restoredId = n.restoredState
                ? n.restoredState.navigationId
                : 0))
            : n instanceof Jt
            ? ((this.lastId = n.id),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.urlAfterRedirects).fragment
              ))
            : n instanceof qn &&
              n.code === cl.IgnoredSameUrlNavigation &&
              ((this.lastSource = void 0),
              (this.restoredId = 0),
              this.scheduleScrollEvent(
                n,
                this.urlSerializer.parse(n.url).fragment
              ));
        });
      }
      consumeScrollEvents() {
        return this.transitions.events.subscribe((n) => {
          n instanceof dl &&
            (n.position
              ? this.options.scrollPositionRestoration === "top"
                ? this.viewportScroller.scrollToPosition([0, 0])
                : this.options.scrollPositionRestoration === "enabled" &&
                  this.viewportScroller.scrollToPosition(n.position)
              : n.anchor && this.options.anchorScrolling === "enabled"
              ? this.viewportScroller.scrollToAnchor(n.anchor)
              : this.options.scrollPositionRestoration !== "disabled" &&
                this.viewportScroller.scrollToPosition([0, 0]));
        });
      }
      scheduleScrollEvent(n, i) {
        this.zone.runOutsideAngular(() => {
          setTimeout(() => {
            this.zone.run(() => {
              this.transitions.events.next(
                new dl(
                  n,
                  this.lastSource === "popstate"
                    ? this.store[this.restoredId]
                    : null,
                  i
                )
              );
            });
          }, 0);
        });
      }
      ngOnDestroy() {
        this.routerEventsSubscription?.unsubscribe(),
          this.scrollEventsSubscription?.unsubscribe();
      }
    };
    (e.ɵfac = function (i) {
      sm();
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })();
function ux(t) {
  return t.routerState.root;
}
function _o(t, e) {
  return { ɵkind: t, ɵproviders: e };
}
function dx() {
  let t = D(Ot);
  return (e) => {
    let r = t.get(gr);
    if (e !== r.components[0]) return;
    let n = t.get(ve),
      i = t.get(vv);
    t.get(kf) === 1 && n.initialNavigation(),
      t.get(Dv, null, $.Optional)?.setUpPreloading(),
      t.get(yv, null, $.Optional)?.init(),
      n.resetRootComponentType(r.componentTypes[0]),
      i.closed || (i.next(), i.complete(), i.unsubscribe());
  };
}
var vv = new S("", { factory: () => new me() }),
  kf = new S("", { providedIn: "root", factory: () => 1 });
function fx() {
  return _o(2, [
    { provide: kf, useValue: 0 },
    {
      provide: Ta,
      multi: !0,
      deps: [Ot],
      useFactory: (e) => {
        let r = e.get(ry, Promise.resolve());
        return () =>
          r.then(
            () =>
              new Promise((n) => {
                let i = e.get(ve),
                  o = e.get(vv);
                mv(i, () => {
                  n(!0);
                }),
                  (e.get(Of).afterPreactivation = () => (
                    n(!0), o.closed ? A(void 0) : o
                  )),
                  i.initialNavigation();
              })
          );
      },
    },
  ]);
}
function hx() {
  return _o(3, [
    {
      provide: Ta,
      multi: !0,
      useFactory: () => {
        let e = D(ve);
        return () => {
          e.setUpLocationChangeListener();
        };
      },
    },
    { provide: kf, useValue: 2 },
  ]);
}
var Dv = new S("");
function px(t) {
  return _o(0, [
    { provide: Dv, useExisting: lx },
    { provide: vl, useExisting: t },
  ]);
}
function gx() {
  return _o(8, [Fy, { provide: Dl, useExisting: Fy }]);
}
function mx(t) {
  let e = [
    { provide: hv, useValue: KM },
    {
      provide: pv,
      useValue: v({ skipNextTransition: !!t?.skipInitialTransition }, t),
    },
  ];
  return _o(9, e);
}
var Vy = new S("ROUTER_FORROOT_GUARD"),
  yx = [
    ni,
    { provide: wo, useClass: uo },
    ve,
    bo,
    { provide: ft, useFactory: ux, deps: [ve] },
    Nf,
    [],
  ],
  Pf = (() => {
    let e = class e {
      constructor(n) {}
      static forRoot(n, i) {
        return {
          ngModule: e,
          providers: [
            yx,
            [],
            { provide: yl, multi: !0, useValue: n },
            { provide: Vy, useFactory: bx, deps: [[ve, new Js(), new _u()]] },
            { provide: Io, useValue: i || {} },
            i?.useHash ? Dx() : wx(),
            vx(),
            i?.preloadingStrategy ? px(i.preloadingStrategy).ɵproviders : [],
            i?.initialNavigation ? Cx(i) : [],
            i?.bindToComponentInputs ? gx().ɵproviders : [],
            i?.enableViewTransitions ? mx().ɵproviders : [],
            Ex(),
          ],
        };
      }
      static forChild(n) {
        return {
          ngModule: e,
          providers: [{ provide: yl, multi: !0, useValue: n }],
        };
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(b(Vy, 8));
    }),
      (e.ɵmod = Re({ type: e })),
      (e.ɵinj = Ne({}));
    let t = e;
    return t;
  })();
function vx() {
  return {
    provide: yv,
    useFactory: () => {
      let t = D(uy),
        e = D(ie),
        r = D(Io),
        n = D(Of),
        i = D(wo);
      return (
        r.scrollOffset && t.setOffset(r.scrollOffset), new cx(i, n, t, e, r)
      );
    },
  };
}
function Dx() {
  return { provide: Cn, useClass: oy };
}
function wx() {
  return { provide: Cn, useClass: Nd };
}
function bx(t) {
  return "guarded";
}
function Cx(t) {
  return [
    t.initialNavigation === "disabled" ? hx().ɵproviders : [],
    t.initialNavigation === "enabledBlocking" ? fx().ɵproviders : [],
  ];
}
var jy = new S("");
function Ex() {
  return [
    { provide: jy, useFactory: dx },
    { provide: Aa, multi: !0, useExisting: jy },
  ];
}
var Pe = { baseApiUrl: "https://codingblogsapi.azurewebsites.net" };
var tn = (() => {
  let e = class e {
    constructor(n, i) {
      (this.document = n),
        (this.platformId = i),
        (this.documentIsAccessible = Kt(this.platformId));
    }
    static getCookieRegExp(n) {
      let i = n.replace(/([\[\]{}()|=;+?,.*^$])/gi, "\\$1");
      return new RegExp("(?:^" + i + "|;\\s*" + i + ")=(.*?)(?:;|$)", "g");
    }
    static safeDecodeURIComponent(n) {
      try {
        return decodeURIComponent(n);
      } catch {
        return n;
      }
    }
    check(n) {
      return this.documentIsAccessible
        ? ((n = encodeURIComponent(n)),
          e.getCookieRegExp(n).test(this.document.cookie))
        : !1;
    }
    get(n) {
      if (this.documentIsAccessible && this.check(n)) {
        n = encodeURIComponent(n);
        let o = e.getCookieRegExp(n).exec(this.document.cookie);
        return o[1] ? e.safeDecodeURIComponent(o[1]) : "";
      } else return "";
    }
    getAll() {
      if (!this.documentIsAccessible) return {};
      let n = {},
        i = this.document;
      return (
        i.cookie &&
          i.cookie !== "" &&
          i.cookie.split(";").forEach((o) => {
            let [s, a] = o.split("=");
            n[e.safeDecodeURIComponent(s.replace(/^ /, ""))] =
              e.safeDecodeURIComponent(a);
          }),
        n
      );
    }
    set(n, i, o, s, a, l, c, u) {
      if (!this.documentIsAccessible) return;
      if (typeof o == "number" || o instanceof Date || s || a || l || c) {
        let g = {
          expires: o,
          path: s,
          domain: a,
          secure: l,
          sameSite: c || "Lax",
          partitioned: u,
        };
        this.set(n, i, g);
        return;
      }
      let d = encodeURIComponent(n) + "=" + encodeURIComponent(i) + ";",
        f = o || {};
      if (f.expires)
        if (typeof f.expires == "number") {
          let g = new Date(
            new Date().getTime() + f.expires * 1e3 * 60 * 60 * 24
          );
          d += "expires=" + g.toUTCString() + ";";
        } else d += "expires=" + f.expires.toUTCString() + ";";
      f.path && (d += "path=" + f.path + ";"),
        f.domain && (d += "domain=" + f.domain + ";"),
        f.secure === !1 &&
          f.sameSite === "None" &&
          ((f.secure = !0),
          console.warn(
            `[ngx-cookie-service] Cookie ${n} was forced with secure flag because sameSite=None.More details : https://github.com/stevermeister/ngx-cookie-service/issues/86#issuecomment-597720130`
          )),
        f.secure && (d += "secure;"),
        f.sameSite || (f.sameSite = "Lax"),
        (d += "sameSite=" + f.sameSite + ";"),
        f.partitioned && (d += "Partitioned;"),
        (this.document.cookie = d);
    }
    delete(n, i, o, s, a = "Lax") {
      if (!this.documentIsAccessible) return;
      let l = new Date("Thu, 01 Jan 1970 00:00:01 GMT");
      this.set(n, "", {
        expires: l,
        path: i,
        domain: o,
        secure: s,
        sameSite: a,
      });
    }
    deleteAll(n, i, o, s = "Lax") {
      if (!this.documentIsAccessible) return;
      let a = this.getAll();
      for (let l in a) a.hasOwnProperty(l) && this.delete(l, n, i, o, s);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Te), b(rt));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var nn = (() => {
  let e = class e {
    constructor(n, i) {
      (this.http = n), (this.cookieService = i);
    }
    addCategory(n) {
      return this.http.post(`${Pe.baseApiUrl}/api/categories?addAuth=true`, n);
    }
    getAllCategories() {
      return this.http.get(`${Pe.baseApiUrl}/api/categories`);
    }
    getCategoryById(n) {
      return this.http.get(`${Pe.baseApiUrl}/api/categories/${n}`);
    }
    updateCategory(n, i) {
      return this.http.put(
        `${Pe.baseApiUrl}/api/categories/${n}?addAuth=true`,
        i
      );
    }
    deleteCategory(n) {
      return this.http.delete(
        `${Pe.baseApiUrl}/api/categories/${n}?addAuth=true`
      );
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Vt), b(tn));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var Ix = () => ["/admin/categories/add"],
  _x = (t) => ["/admin/categories", t];
function Sx(t, e) {
  if (
    (t & 1 &&
      (p(0, "tr")(1, "td"),
      m(2),
      h(),
      p(3, "td"),
      m(4),
      h(),
      p(5, "td"),
      m(6),
      h(),
      p(7, "a", 8),
      m(8, "Edit"),
      h()()),
    t & 2)
  ) {
    let r = e.$implicit;
    y(2),
      re(r.id),
      y(2),
      re(r.name),
      y(2),
      re(r.urlHandle),
      y(),
      T("routerLink", Jr(4, _x, r.id));
  }
}
function Mx(t, e) {
  if (
    (t & 1 &&
      (p(0, "table", 5)(1, "thead")(2, "tr")(3, "th", 6),
      m(4, "ID"),
      h(),
      p(5, "th", 6),
      m(6, "Name"),
      h(),
      p(7, "th", 6),
      m(8, "UrlHandle"),
      h(),
      ne(9, "th", 6),
      h()(),
      p(10, "tbody"),
      G(11, Sx, 9, 6, "tr", 7),
      h()()),
    t & 2)
  ) {
    let r = e.ngIf;
    y(11), T("ngForOf", r);
  }
}
var wv = (() => {
  let e = class e {
    constructor(n) {
      this.categoryService = n;
    }
    ngOnInit() {
      this.categoryList$ = this.categoryService.getAllCategories();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(nn));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-category-list"]],
      decls: 8,
      vars: 5,
      consts: [
        [1, "container"],
        [1, "mt-3"],
        [1, "d-flex", "justify-content-end", "mt-3"],
        [1, "btn", "btn-primary", 3, "routerLink"],
        ["class", "table table-bordered mt-3", 4, "ngIf"],
        [1, "table", "table-bordered", "mt-3"],
        ["scope", "col"],
        [4, "ngFor", "ngForOf"],
        [1, "btn", "btn-light", "mx-3", "mt-1", "mb-1", 3, "routerLink"],
      ],
      template: function (i, o) {
        i & 1 &&
          (p(0, "div", 0)(1, "h1", 1),
          m(2, "Category List"),
          h(),
          p(3, "div", 2)(4, "a", 3),
          m(5, "Add Category"),
          h()(),
          G(6, Mx, 12, 1, "table", 4),
          Me(7, "async"),
          h()),
          i & 2 &&
            (y(4),
            T("routerLink", Bn(4, Ix)),
            y(2),
            T("ngIf", je(7, 2, o.categoryList$)));
      },
      dependencies: [it, Oe, Qn, ze],
    }));
  let t = e;
  return t;
})();
var Tv = (() => {
    let e = class e {
      constructor(n, i) {
        (this._renderer = n),
          (this._elementRef = i),
          (this.onChange = (o) => {}),
          (this.onTouched = () => {});
      }
      setProperty(n, i) {
        this._renderer.setProperty(this._elementRef.nativeElement, n, i);
      }
      registerOnTouched(n) {
        this.onTouched = n;
      }
      registerOnChange(n) {
        this.onChange = n;
      }
      setDisabledState(n) {
        this.setProperty("disabled", n);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(qt), w($e));
    }),
      (e.ɵdir = Ce({ type: e }));
    let t = e;
    return t;
  })(),
  xl = (() => {
    let e = class e extends Tv {};
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = Vn(e)))(o || e);
      };
    })()),
      (e.ɵdir = Ce({ type: e, features: [Pt] }));
    let t = e;
    return t;
  })(),
  No = new S(""),
  xx = { provide: No, useExisting: hn(() => Ro), multi: !0 },
  Ro = (() => {
    let e = class e extends xl {
      writeValue(n) {
        this.setProperty("checked", n);
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = Vn(e)))(o || e);
      };
    })()),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["input", "type", "checkbox", "formControlName", ""],
          ["input", "type", "checkbox", "formControl", ""],
          ["input", "type", "checkbox", "ngModel", ""],
        ],
        hostBindings: function (i, o) {
          i & 1 &&
            z("change", function (a) {
              return o.onChange(a.target.checked);
            })("blur", function () {
              return o.onTouched();
            });
        },
        features: [pr([xx]), Pt],
      }));
    let t = e;
    return t;
  })(),
  Tx = { provide: No, useExisting: hn(() => ot), multi: !0 };
function Ax() {
  let t = Yt() ? Yt().getUserAgent() : "";
  return /android (\d+)/.test(t.toLowerCase());
}
var Nx = new S(""),
  ot = (() => {
    let e = class e extends Tv {
      constructor(n, i, o) {
        super(n, i),
          (this._compositionMode = o),
          (this._composing = !1),
          this._compositionMode == null && (this._compositionMode = !Ax());
      }
      writeValue(n) {
        let i = n ?? "";
        this.setProperty("value", i);
      }
      _handleInput(n) {
        (!this._compositionMode ||
          (this._compositionMode && !this._composing)) &&
          this.onChange(n);
      }
      _compositionStart() {
        this._composing = !0;
      }
      _compositionEnd(n) {
        (this._composing = !1), this._compositionMode && this.onChange(n);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(qt), w($e), w(Nx, 8));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["input", "formControlName", "", 3, "type", "checkbox"],
          ["textarea", "formControlName", ""],
          ["input", "formControl", "", 3, "type", "checkbox"],
          ["textarea", "formControl", ""],
          ["input", "ngModel", "", 3, "type", "checkbox"],
          ["textarea", "ngModel", ""],
          ["", "ngDefaultControl", ""],
        ],
        hostBindings: function (i, o) {
          i & 1 &&
            z("input", function (a) {
              return o._handleInput(a.target.value);
            })("blur", function () {
              return o.onTouched();
            })("compositionstart", function () {
              return o._compositionStart();
            })("compositionend", function (a) {
              return o._compositionEnd(a.target.value);
            });
        },
        features: [pr([Tx]), Pt],
      }));
    let t = e;
    return t;
  })();
var Av = new S(""),
  Nv = new S("");
function Rv(t) {
  return t != null;
}
function Ov(t) {
  return $n(t) ? ae(t) : t;
}
function kv(t) {
  let e = {};
  return (
    t.forEach((r) => {
      e = r != null ? v(v({}, e), r) : e;
    }),
    Object.keys(e).length === 0 ? null : e
  );
}
function Pv(t, e) {
  return e.map((r) => r(t));
}
function Rx(t) {
  return !t.validate;
}
function Fv(t) {
  return t.map((e) => (Rx(e) ? e : (r) => e.validate(r)));
}
function Ox(t) {
  if (!t) return null;
  let e = t.filter(Rv);
  return e.length == 0
    ? null
    : function (r) {
        return kv(Pv(r, e));
      };
}
function Lf(t) {
  return t != null ? Ox(Fv(t)) : null;
}
function kx(t) {
  if (!t) return null;
  let e = t.filter(Rv);
  return e.length == 0
    ? null
    : function (r) {
        let n = Pv(r, e).map(Ov);
        return ec(n).pipe(k(kv));
      };
}
function Vf(t) {
  return t != null ? kx(Fv(t)) : null;
}
function bv(t, e) {
  return t === null ? [e] : Array.isArray(t) ? [...t, e] : [t, e];
}
function Px(t) {
  return t._rawValidators;
}
function Fx(t) {
  return t._rawAsyncValidators;
}
function Ff(t) {
  return t ? (Array.isArray(t) ? t : [t]) : [];
}
function El(t, e) {
  return Array.isArray(t) ? t.includes(e) : t === e;
}
function Cv(t, e) {
  let r = Ff(e);
  return (
    Ff(t).forEach((i) => {
      El(r, i) || r.push(i);
    }),
    r
  );
}
function Ev(t, e) {
  return Ff(e).filter((r) => !El(t, r));
}
var Il = class {
    constructor() {
      (this._rawValidators = []),
        (this._rawAsyncValidators = []),
        (this._onDestroyCallbacks = []);
    }
    get value() {
      return this.control ? this.control.value : null;
    }
    get valid() {
      return this.control ? this.control.valid : null;
    }
    get invalid() {
      return this.control ? this.control.invalid : null;
    }
    get pending() {
      return this.control ? this.control.pending : null;
    }
    get disabled() {
      return this.control ? this.control.disabled : null;
    }
    get enabled() {
      return this.control ? this.control.enabled : null;
    }
    get errors() {
      return this.control ? this.control.errors : null;
    }
    get pristine() {
      return this.control ? this.control.pristine : null;
    }
    get dirty() {
      return this.control ? this.control.dirty : null;
    }
    get touched() {
      return this.control ? this.control.touched : null;
    }
    get status() {
      return this.control ? this.control.status : null;
    }
    get untouched() {
      return this.control ? this.control.untouched : null;
    }
    get statusChanges() {
      return this.control ? this.control.statusChanges : null;
    }
    get valueChanges() {
      return this.control ? this.control.valueChanges : null;
    }
    get path() {
      return null;
    }
    _setValidators(e) {
      (this._rawValidators = e || []),
        (this._composedValidatorFn = Lf(this._rawValidators));
    }
    _setAsyncValidators(e) {
      (this._rawAsyncValidators = e || []),
        (this._composedAsyncValidatorFn = Vf(this._rawAsyncValidators));
    }
    get validator() {
      return this._composedValidatorFn || null;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn || null;
    }
    _registerOnDestroy(e) {
      this._onDestroyCallbacks.push(e);
    }
    _invokeOnDestroyCallbacks() {
      this._onDestroyCallbacks.forEach((e) => e()),
        (this._onDestroyCallbacks = []);
    }
    reset(e = void 0) {
      this.control && this.control.reset(e);
    }
    hasError(e, r) {
      return this.control ? this.control.hasError(e, r) : !1;
    }
    getError(e, r) {
      return this.control ? this.control.getError(e, r) : null;
    }
  },
  gi = class extends Il {
    get formDirective() {
      return null;
    }
    get path() {
      return null;
    }
  },
  Ao = class extends Il {
    constructor() {
      super(...arguments),
        (this._parent = null),
        (this.name = null),
        (this.valueAccessor = null);
    }
  },
  _l = class {
    constructor(e) {
      this._cd = e;
    }
    get isTouched() {
      return !!this._cd?.control?.touched;
    }
    get isUntouched() {
      return !!this._cd?.control?.untouched;
    }
    get isPristine() {
      return !!this._cd?.control?.pristine;
    }
    get isDirty() {
      return !!this._cd?.control?.dirty;
    }
    get isValid() {
      return !!this._cd?.control?.valid;
    }
    get isInvalid() {
      return !!this._cd?.control?.invalid;
    }
    get isPending() {
      return !!this._cd?.control?.pending;
    }
    get isSubmitted() {
      return !!this._cd?.submitted;
    }
  },
  Lx = {
    "[class.ng-untouched]": "isUntouched",
    "[class.ng-touched]": "isTouched",
    "[class.ng-pristine]": "isPristine",
    "[class.ng-dirty]": "isDirty",
    "[class.ng-valid]": "isValid",
    "[class.ng-invalid]": "isInvalid",
    "[class.ng-pending]": "isPending",
  },
  nV = Z(v({}, Lx), { "[class.ng-submitted]": "isSubmitted" }),
  Ct = (() => {
    let e = class e extends _l {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(Ao, 2));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["", "formControlName", ""],
          ["", "ngModel", ""],
          ["", "formControl", ""],
        ],
        hostVars: 14,
        hostBindings: function (i, o) {
          i & 2 &&
            Xr("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
              "ng-pristine",
              o.isPristine
            )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
              "ng-invalid",
              o.isInvalid
            )("ng-pending", o.isPending);
        },
        features: [Pt],
      }));
    let t = e;
    return t;
  })(),
  Et = (() => {
    let e = class e extends _l {
      constructor(n) {
        super(n);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(gi, 10));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["", "formGroupName", ""],
          ["", "formArrayName", ""],
          ["", "ngModelGroup", ""],
          ["", "formGroup", ""],
          ["form", 3, "ngNoForm", ""],
          ["", "ngForm", ""],
        ],
        hostVars: 16,
        hostBindings: function (i, o) {
          i & 2 &&
            Xr("ng-untouched", o.isUntouched)("ng-touched", o.isTouched)(
              "ng-pristine",
              o.isPristine
            )("ng-dirty", o.isDirty)("ng-valid", o.isValid)(
              "ng-invalid",
              o.isInvalid
            )("ng-pending", o.isPending)("ng-submitted", o.isSubmitted);
        },
        features: [Pt],
      }));
    let t = e;
    return t;
  })();
var Mo = "VALID",
  Cl = "INVALID",
  pi = "PENDING",
  xo = "DISABLED";
function Lv(t) {
  return (Tl(t) ? t.validators : t) || null;
}
function Vx(t) {
  return Array.isArray(t) ? Lf(t) : t || null;
}
function Vv(t, e) {
  return (Tl(e) ? e.asyncValidators : t) || null;
}
function jx(t) {
  return Array.isArray(t) ? Vf(t) : t || null;
}
function Tl(t) {
  return t != null && !Array.isArray(t) && typeof t == "object";
}
function Bx(t, e, r) {
  let n = t.controls;
  if (!(e ? Object.keys(n) : n).length) throw new _(1e3, "");
  if (!n[r]) throw new _(1001, "");
}
function $x(t, e, r) {
  t._forEachChild((n, i) => {
    if (r[i] === void 0) throw new _(1002, "");
  });
}
var Sl = class {
    constructor(e, r) {
      (this._pendingDirty = !1),
        (this._hasOwnPendingAsyncValidator = !1),
        (this._pendingTouched = !1),
        (this._onCollectionChange = () => {}),
        (this._parent = null),
        (this.pristine = !0),
        (this.touched = !1),
        (this._onDisabledChange = []),
        this._assignValidators(e),
        this._assignAsyncValidators(r);
    }
    get validator() {
      return this._composedValidatorFn;
    }
    set validator(e) {
      this._rawValidators = this._composedValidatorFn = e;
    }
    get asyncValidator() {
      return this._composedAsyncValidatorFn;
    }
    set asyncValidator(e) {
      this._rawAsyncValidators = this._composedAsyncValidatorFn = e;
    }
    get parent() {
      return this._parent;
    }
    get valid() {
      return this.status === Mo;
    }
    get invalid() {
      return this.status === Cl;
    }
    get pending() {
      return this.status == pi;
    }
    get disabled() {
      return this.status === xo;
    }
    get enabled() {
      return this.status !== xo;
    }
    get dirty() {
      return !this.pristine;
    }
    get untouched() {
      return !this.touched;
    }
    get updateOn() {
      return this._updateOn
        ? this._updateOn
        : this.parent
        ? this.parent.updateOn
        : "change";
    }
    setValidators(e) {
      this._assignValidators(e);
    }
    setAsyncValidators(e) {
      this._assignAsyncValidators(e);
    }
    addValidators(e) {
      this.setValidators(Cv(e, this._rawValidators));
    }
    addAsyncValidators(e) {
      this.setAsyncValidators(Cv(e, this._rawAsyncValidators));
    }
    removeValidators(e) {
      this.setValidators(Ev(e, this._rawValidators));
    }
    removeAsyncValidators(e) {
      this.setAsyncValidators(Ev(e, this._rawAsyncValidators));
    }
    hasValidator(e) {
      return El(this._rawValidators, e);
    }
    hasAsyncValidator(e) {
      return El(this._rawAsyncValidators, e);
    }
    clearValidators() {
      this.validator = null;
    }
    clearAsyncValidators() {
      this.asyncValidator = null;
    }
    markAsTouched(e = {}) {
      (this.touched = !0),
        this._parent && !e.onlySelf && this._parent.markAsTouched(e);
    }
    markAllAsTouched() {
      this.markAsTouched({ onlySelf: !0 }),
        this._forEachChild((e) => e.markAllAsTouched());
    }
    markAsUntouched(e = {}) {
      (this.touched = !1),
        (this._pendingTouched = !1),
        this._forEachChild((r) => {
          r.markAsUntouched({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    markAsDirty(e = {}) {
      (this.pristine = !1),
        this._parent && !e.onlySelf && this._parent.markAsDirty(e);
    }
    markAsPristine(e = {}) {
      (this.pristine = !0),
        (this._pendingDirty = !1),
        this._forEachChild((r) => {
          r.markAsPristine({ onlySelf: !0 });
        }),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    markAsPending(e = {}) {
      (this.status = pi),
        e.emitEvent !== !1 && this.statusChanges.emit(this.status),
        this._parent && !e.onlySelf && this._parent.markAsPending(e);
    }
    disable(e = {}) {
      let r = this._parentMarkedDirty(e.onlySelf);
      (this.status = xo),
        (this.errors = null),
        this._forEachChild((n) => {
          n.disable(Z(v({}, e), { onlySelf: !0 }));
        }),
        this._updateValue(),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._updateAncestors(Z(v({}, e), { skipPristineCheck: r })),
        this._onDisabledChange.forEach((n) => n(!0));
    }
    enable(e = {}) {
      let r = this._parentMarkedDirty(e.onlySelf);
      (this.status = Mo),
        this._forEachChild((n) => {
          n.enable(Z(v({}, e), { onlySelf: !0 }));
        }),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent }),
        this._updateAncestors(Z(v({}, e), { skipPristineCheck: r })),
        this._onDisabledChange.forEach((n) => n(!1));
    }
    _updateAncestors(e) {
      this._parent &&
        !e.onlySelf &&
        (this._parent.updateValueAndValidity(e),
        e.skipPristineCheck || this._parent._updatePristine(),
        this._parent._updateTouched());
    }
    setParent(e) {
      this._parent = e;
    }
    getRawValue() {
      return this.value;
    }
    updateValueAndValidity(e = {}) {
      this._setInitialStatus(),
        this._updateValue(),
        this.enabled &&
          (this._cancelExistingSubscription(),
          (this.errors = this._runValidator()),
          (this.status = this._calculateStatus()),
          (this.status === Mo || this.status === pi) &&
            this._runAsyncValidator(e.emitEvent)),
        e.emitEvent !== !1 &&
          (this.valueChanges.emit(this.value),
          this.statusChanges.emit(this.status)),
        this._parent && !e.onlySelf && this._parent.updateValueAndValidity(e);
    }
    _updateTreeValidity(e = { emitEvent: !0 }) {
      this._forEachChild((r) => r._updateTreeValidity(e)),
        this.updateValueAndValidity({ onlySelf: !0, emitEvent: e.emitEvent });
    }
    _setInitialStatus() {
      this.status = this._allControlsDisabled() ? xo : Mo;
    }
    _runValidator() {
      return this.validator ? this.validator(this) : null;
    }
    _runAsyncValidator(e) {
      if (this.asyncValidator) {
        (this.status = pi), (this._hasOwnPendingAsyncValidator = !0);
        let r = Ov(this.asyncValidator(this));
        this._asyncValidationSubscription = r.subscribe((n) => {
          (this._hasOwnPendingAsyncValidator = !1),
            this.setErrors(n, { emitEvent: e });
        });
      }
    }
    _cancelExistingSubscription() {
      this._asyncValidationSubscription &&
        (this._asyncValidationSubscription.unsubscribe(),
        (this._hasOwnPendingAsyncValidator = !1));
    }
    setErrors(e, r = {}) {
      (this.errors = e), this._updateControlsErrors(r.emitEvent !== !1);
    }
    get(e) {
      let r = e;
      return r == null ||
        (Array.isArray(r) || (r = r.split(".")), r.length === 0)
        ? null
        : r.reduce((n, i) => n && n._find(i), this);
    }
    getError(e, r) {
      let n = r ? this.get(r) : this;
      return n && n.errors ? n.errors[e] : null;
    }
    hasError(e, r) {
      return !!this.getError(e, r);
    }
    get root() {
      let e = this;
      for (; e._parent; ) e = e._parent;
      return e;
    }
    _updateControlsErrors(e) {
      (this.status = this._calculateStatus()),
        e && this.statusChanges.emit(this.status),
        this._parent && this._parent._updateControlsErrors(e);
    }
    _initObservables() {
      (this.valueChanges = new pe()), (this.statusChanges = new pe());
    }
    _calculateStatus() {
      return this._allControlsDisabled()
        ? xo
        : this.errors
        ? Cl
        : this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(pi)
        ? pi
        : this._anyControlsHaveStatus(Cl)
        ? Cl
        : Mo;
    }
    _anyControlsHaveStatus(e) {
      return this._anyControls((r) => r.status === e);
    }
    _anyControlsDirty() {
      return this._anyControls((e) => e.dirty);
    }
    _anyControlsTouched() {
      return this._anyControls((e) => e.touched);
    }
    _updatePristine(e = {}) {
      (this.pristine = !this._anyControlsDirty()),
        this._parent && !e.onlySelf && this._parent._updatePristine(e);
    }
    _updateTouched(e = {}) {
      (this.touched = this._anyControlsTouched()),
        this._parent && !e.onlySelf && this._parent._updateTouched(e);
    }
    _registerOnCollectionChange(e) {
      this._onCollectionChange = e;
    }
    _setUpdateStrategy(e) {
      Tl(e) && e.updateOn != null && (this._updateOn = e.updateOn);
    }
    _parentMarkedDirty(e) {
      let r = this._parent && this._parent.dirty;
      return !e && !!r && !this._parent._anyControlsDirty();
    }
    _find(e) {
      return null;
    }
    _assignValidators(e) {
      (this._rawValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedValidatorFn = Vx(this._rawValidators));
    }
    _assignAsyncValidators(e) {
      (this._rawAsyncValidators = Array.isArray(e) ? e.slice() : e),
        (this._composedAsyncValidatorFn = jx(this._rawAsyncValidators));
    }
  },
  Ml = class extends Sl {
    constructor(e, r, n) {
      super(Lv(r), Vv(n, r)),
        (this.controls = e),
        this._initObservables(),
        this._setUpdateStrategy(r),
        this._setUpControls(),
        this.updateValueAndValidity({
          onlySelf: !0,
          emitEvent: !!this.asyncValidator,
        });
    }
    registerControl(e, r) {
      return this.controls[e]
        ? this.controls[e]
        : ((this.controls[e] = r),
          r.setParent(this),
          r._registerOnCollectionChange(this._onCollectionChange),
          r);
    }
    addControl(e, r, n = {}) {
      this.registerControl(e, r),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    removeControl(e, r = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        this.updateValueAndValidity({ emitEvent: r.emitEvent }),
        this._onCollectionChange();
    }
    setControl(e, r, n = {}) {
      this.controls[e] &&
        this.controls[e]._registerOnCollectionChange(() => {}),
        delete this.controls[e],
        r && this.registerControl(e, r),
        this.updateValueAndValidity({ emitEvent: n.emitEvent }),
        this._onCollectionChange();
    }
    contains(e) {
      return this.controls.hasOwnProperty(e) && this.controls[e].enabled;
    }
    setValue(e, r = {}) {
      $x(this, !0, e),
        Object.keys(e).forEach((n) => {
          Bx(this, !0, n),
            this.controls[n].setValue(e[n], {
              onlySelf: !0,
              emitEvent: r.emitEvent,
            });
        }),
        this.updateValueAndValidity(r);
    }
    patchValue(e, r = {}) {
      e != null &&
        (Object.keys(e).forEach((n) => {
          let i = this.controls[n];
          i && i.patchValue(e[n], { onlySelf: !0, emitEvent: r.emitEvent });
        }),
        this.updateValueAndValidity(r));
    }
    reset(e = {}, r = {}) {
      this._forEachChild((n, i) => {
        n.reset(e ? e[i] : null, { onlySelf: !0, emitEvent: r.emitEvent });
      }),
        this._updatePristine(r),
        this._updateTouched(r),
        this.updateValueAndValidity(r);
    }
    getRawValue() {
      return this._reduceChildren(
        {},
        (e, r, n) => ((e[n] = r.getRawValue()), e)
      );
    }
    _syncPendingControls() {
      let e = this._reduceChildren(!1, (r, n) =>
        n._syncPendingControls() ? !0 : r
      );
      return e && this.updateValueAndValidity({ onlySelf: !0 }), e;
    }
    _forEachChild(e) {
      Object.keys(this.controls).forEach((r) => {
        let n = this.controls[r];
        n && e(n, r);
      });
    }
    _setUpControls() {
      this._forEachChild((e) => {
        e.setParent(this),
          e._registerOnCollectionChange(this._onCollectionChange);
      });
    }
    _updateValue() {
      this.value = this._reduceValue();
    }
    _anyControls(e) {
      for (let [r, n] of Object.entries(this.controls))
        if (this.contains(r) && e(n)) return !0;
      return !1;
    }
    _reduceValue() {
      let e = {};
      return this._reduceChildren(
        e,
        (r, n, i) => ((n.enabled || this.disabled) && (r[i] = n.value), r)
      );
    }
    _reduceChildren(e, r) {
      let n = e;
      return (
        this._forEachChild((i, o) => {
          n = r(n, i, o);
        }),
        n
      );
    }
    _allControlsDisabled() {
      for (let e of Object.keys(this.controls))
        if (this.controls[e].enabled) return !1;
      return Object.keys(this.controls).length > 0 || this.disabled;
    }
    _find(e) {
      return this.controls.hasOwnProperty(e) ? this.controls[e] : null;
    }
  };
var jf = new S("CallSetDisabledState", {
    providedIn: "root",
    factory: () => Bf,
  }),
  Bf = "always";
function Ux(t, e) {
  return [...e.path, t];
}
function jv(t, e, r = Bf) {
  Bv(t, e),
    e.valueAccessor.writeValue(t.value),
    (t.disabled || r === "always") &&
      e.valueAccessor.setDisabledState?.(t.disabled),
    zx(t, e),
    Gx(t, e),
    Wx(t, e),
    Hx(t, e);
}
function Iv(t, e) {
  t.forEach((r) => {
    r.registerOnValidatorChange && r.registerOnValidatorChange(e);
  });
}
function Hx(t, e) {
  if (e.valueAccessor.setDisabledState) {
    let r = (n) => {
      e.valueAccessor.setDisabledState(n);
    };
    t.registerOnDisabledChange(r),
      e._registerOnDestroy(() => {
        t._unregisterOnDisabledChange(r);
      });
  }
}
function Bv(t, e) {
  let r = Px(t);
  e.validator !== null
    ? t.setValidators(bv(r, e.validator))
    : typeof r == "function" && t.setValidators([r]);
  let n = Fx(t);
  e.asyncValidator !== null
    ? t.setAsyncValidators(bv(n, e.asyncValidator))
    : typeof n == "function" && t.setAsyncValidators([n]);
  let i = () => t.updateValueAndValidity();
  Iv(e._rawValidators, i), Iv(e._rawAsyncValidators, i);
}
function zx(t, e) {
  e.valueAccessor.registerOnChange((r) => {
    (t._pendingValue = r),
      (t._pendingChange = !0),
      (t._pendingDirty = !0),
      t.updateOn === "change" && $v(t, e);
  });
}
function Wx(t, e) {
  e.valueAccessor.registerOnTouched(() => {
    (t._pendingTouched = !0),
      t.updateOn === "blur" && t._pendingChange && $v(t, e),
      t.updateOn !== "submit" && t.markAsTouched();
  });
}
function $v(t, e) {
  t._pendingDirty && t.markAsDirty(),
    t.setValue(t._pendingValue, { emitModelToViewChange: !1 }),
    e.viewToModelUpdate(t._pendingValue),
    (t._pendingChange = !1);
}
function Gx(t, e) {
  let r = (n, i) => {
    e.valueAccessor.writeValue(n), i && e.viewToModelUpdate(n);
  };
  t.registerOnChange(r),
    e._registerOnDestroy(() => {
      t._unregisterOnChange(r);
    });
}
function qx(t, e) {
  t == null, Bv(t, e);
}
function Zx(t, e) {
  if (!t.hasOwnProperty("model")) return !1;
  let r = t.model;
  return r.isFirstChange() ? !0 : !Object.is(e, r.currentValue);
}
function Qx(t) {
  return Object.getPrototypeOf(t.constructor) === xl;
}
function Yx(t, e) {
  t._syncPendingControls(),
    e.forEach((r) => {
      let n = r.control;
      n.updateOn === "submit" &&
        n._pendingChange &&
        (r.viewToModelUpdate(n._pendingValue), (n._pendingChange = !1));
    });
}
function Kx(t, e) {
  if (!e) return null;
  Array.isArray(e);
  let r, n, i;
  return (
    e.forEach((o) => {
      o.constructor === ot ? (r = o) : Qx(o) ? (n = o) : (i = o);
    }),
    i || n || r || null
  );
}
var Xx = { provide: gi, useExisting: hn(() => ht) },
  To = Promise.resolve(),
  ht = (() => {
    let e = class e extends gi {
      constructor(n, i, o) {
        super(),
          (this.callSetDisabledState = o),
          (this.submitted = !1),
          (this._directives = new Set()),
          (this.ngSubmit = new pe()),
          (this.form = new Ml({}, Lf(n), Vf(i)));
      }
      ngAfterViewInit() {
        this._setUpdateStrategy();
      }
      get formDirective() {
        return this;
      }
      get control() {
        return this.form;
      }
      get path() {
        return [];
      }
      get controls() {
        return this.form.controls;
      }
      addControl(n) {
        To.then(() => {
          let i = this._findContainer(n.path);
          (n.control = i.registerControl(n.name, n.control)),
            jv(n.control, n, this.callSetDisabledState),
            n.control.updateValueAndValidity({ emitEvent: !1 }),
            this._directives.add(n);
        });
      }
      getControl(n) {
        return this.form.get(n.path);
      }
      removeControl(n) {
        To.then(() => {
          let i = this._findContainer(n.path);
          i && i.removeControl(n.name), this._directives.delete(n);
        });
      }
      addFormGroup(n) {
        To.then(() => {
          let i = this._findContainer(n.path),
            o = new Ml({});
          qx(o, n),
            i.registerControl(n.name, o),
            o.updateValueAndValidity({ emitEvent: !1 });
        });
      }
      removeFormGroup(n) {
        To.then(() => {
          let i = this._findContainer(n.path);
          i && i.removeControl(n.name);
        });
      }
      getFormGroup(n) {
        return this.form.get(n.path);
      }
      updateModel(n, i) {
        To.then(() => {
          this.form.get(n.path).setValue(i);
        });
      }
      setValue(n) {
        this.control.setValue(n);
      }
      onSubmit(n) {
        return (
          (this.submitted = !0),
          Yx(this.form, this._directives),
          this.ngSubmit.emit(n),
          n?.target?.method === "dialog"
        );
      }
      onReset() {
        this.resetForm();
      }
      resetForm(n = void 0) {
        this.form.reset(n), (this.submitted = !1);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.form._updateOn = this.options.updateOn);
      }
      _findContainer(n) {
        return n.pop(), n.length ? this.form.get(n) : this.form;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w(Av, 10), w(Nv, 10), w(jf, 8));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["form", 3, "ngNoForm", "", 3, "formGroup", ""],
          ["ng-form"],
          ["", "ngForm", ""],
        ],
        hostBindings: function (i, o) {
          i & 1 &&
            z("submit", function (a) {
              return o.onSubmit(a);
            })("reset", function () {
              return o.onReset();
            });
        },
        inputs: { options: [Fe.None, "ngFormOptions", "options"] },
        outputs: { ngSubmit: "ngSubmit" },
        exportAs: ["ngForm"],
        features: [pr([Xx]), Pt],
      }));
    let t = e;
    return t;
  })();
function _v(t, e) {
  let r = t.indexOf(e);
  r > -1 && t.splice(r, 1);
}
function Sv(t) {
  return (
    typeof t == "object" &&
    t !== null &&
    Object.keys(t).length === 2 &&
    "value" in t &&
    "disabled" in t
  );
}
var Jx = class extends Sl {
  constructor(e = null, r, n) {
    super(Lv(r), Vv(n, r)),
      (this.defaultValue = null),
      (this._onChange = []),
      (this._pendingChange = !1),
      this._applyFormState(e),
      this._setUpdateStrategy(r),
      this._initObservables(),
      this.updateValueAndValidity({
        onlySelf: !0,
        emitEvent: !!this.asyncValidator,
      }),
      Tl(r) &&
        (r.nonNullable || r.initialValueIsDefault) &&
        (Sv(e) ? (this.defaultValue = e.value) : (this.defaultValue = e));
  }
  setValue(e, r = {}) {
    (this.value = this._pendingValue = e),
      this._onChange.length &&
        r.emitModelToViewChange !== !1 &&
        this._onChange.forEach((n) =>
          n(this.value, r.emitViewToModelChange !== !1)
        ),
      this.updateValueAndValidity(r);
  }
  patchValue(e, r = {}) {
    this.setValue(e, r);
  }
  reset(e = this.defaultValue, r = {}) {
    this._applyFormState(e),
      this.markAsPristine(r),
      this.markAsUntouched(r),
      this.setValue(this.value, r),
      (this._pendingChange = !1);
  }
  _updateValue() {}
  _anyControls(e) {
    return !1;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(e) {
    this._onChange.push(e);
  }
  _unregisterOnChange(e) {
    _v(this._onChange, e);
  }
  registerOnDisabledChange(e) {
    this._onDisabledChange.push(e);
  }
  _unregisterOnDisabledChange(e) {
    _v(this._onDisabledChange, e);
  }
  _forEachChild(e) {}
  _syncPendingControls() {
    return this.updateOn === "submit" &&
      (this._pendingDirty && this.markAsDirty(),
      this._pendingTouched && this.markAsTouched(),
      this._pendingChange)
      ? (this.setValue(this._pendingValue, {
          onlySelf: !0,
          emitModelToViewChange: !1,
        }),
        !0)
      : !1;
  }
  _applyFormState(e) {
    Sv(e)
      ? ((this.value = this._pendingValue = e.value),
        e.disabled
          ? this.disable({ onlySelf: !0, emitEvent: !1 })
          : this.enable({ onlySelf: !0, emitEvent: !1 }))
      : (this.value = this._pendingValue = e);
  }
};
var eT = { provide: Ao, useExisting: hn(() => pt) },
  Mv = Promise.resolve(),
  pt = (() => {
    let e = class e extends Ao {
      constructor(n, i, o, s, a, l) {
        super(),
          (this._changeDetectorRef = a),
          (this.callSetDisabledState = l),
          (this.control = new Jx()),
          (this._registered = !1),
          (this.name = ""),
          (this.update = new pe()),
          (this._parent = n),
          this._setValidators(i),
          this._setAsyncValidators(o),
          (this.valueAccessor = Kx(this, s));
      }
      ngOnChanges(n) {
        if ((this._checkForErrors(), !this._registered || "name" in n)) {
          if (this._registered && (this._checkName(), this.formDirective)) {
            let i = n.name.previousValue;
            this.formDirective.removeControl({
              name: i,
              path: this._getPath(i),
            });
          }
          this._setUpControl();
        }
        "isDisabled" in n && this._updateDisabled(n),
          Zx(n, this.viewModel) &&
            (this._updateValue(this.model), (this.viewModel = this.model));
      }
      ngOnDestroy() {
        this.formDirective && this.formDirective.removeControl(this);
      }
      get path() {
        return this._getPath(this.name);
      }
      get formDirective() {
        return this._parent ? this._parent.formDirective : null;
      }
      viewToModelUpdate(n) {
        (this.viewModel = n), this.update.emit(n);
      }
      _setUpControl() {
        this._setUpdateStrategy(),
          this._isStandalone()
            ? this._setUpStandalone()
            : this.formDirective.addControl(this),
          (this._registered = !0);
      }
      _setUpdateStrategy() {
        this.options &&
          this.options.updateOn != null &&
          (this.control._updateOn = this.options.updateOn);
      }
      _isStandalone() {
        return !this._parent || !!(this.options && this.options.standalone);
      }
      _setUpStandalone() {
        jv(this.control, this, this.callSetDisabledState),
          this.control.updateValueAndValidity({ emitEvent: !1 });
      }
      _checkForErrors() {
        this._isStandalone() || this._checkParentType(), this._checkName();
      }
      _checkParentType() {}
      _checkName() {
        this.options && this.options.name && (this.name = this.options.name),
          !this._isStandalone() && this.name;
      }
      _updateValue(n) {
        Mv.then(() => {
          this.control.setValue(n, { emitViewToModelChange: !1 }),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _updateDisabled(n) {
        let i = n.isDisabled.currentValue,
          o = i !== 0 && mr(i);
        Mv.then(() => {
          o && !this.control.disabled
            ? this.control.disable()
            : !o && this.control.disabled && this.control.enable(),
            this._changeDetectorRef?.markForCheck();
        });
      }
      _getPath(n) {
        return this._parent ? Ux(n, this._parent) : [n];
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(
        w(gi, 9),
        w(Av, 10),
        w(Nv, 10),
        w(No, 10),
        w(Un, 8),
        w(jf, 8)
      );
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["", "ngModel", "", 3, "formControlName", "", 3, "formControl", ""],
        ],
        inputs: {
          name: "name",
          isDisabled: [Fe.None, "disabled", "isDisabled"],
          model: [Fe.None, "ngModel", "model"],
          options: [Fe.None, "ngModelOptions", "options"],
        },
        outputs: { update: "ngModelChange" },
        exportAs: ["ngModel"],
        features: [pr([eT]), Pt, mn],
      }));
    let t = e;
    return t;
  })(),
  It = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [["form", 3, "ngNoForm", "", 3, "ngNativeValidate", ""]],
        hostAttrs: ["novalidate", ""],
      }));
    let t = e;
    return t;
  })();
var tT = { provide: No, useExisting: hn(() => Hv), multi: !0 };
function Uv(t, e) {
  return t == null
    ? `${e}`
    : (e && typeof e == "object" && (e = "Object"), `${t}: ${e}`.slice(0, 50));
}
function nT(t) {
  return t.split(":")[0];
}
var Hv = (() => {
    let e = class e extends xl {
      constructor() {
        super(...arguments),
          (this._optionMap = new Map()),
          (this._idCounter = 0),
          (this._compareWith = Object.is);
      }
      set compareWith(n) {
        this._compareWith = n;
      }
      writeValue(n) {
        this.value = n;
        let i = this._getOptionId(n),
          o = Uv(i, n);
        this.setProperty("value", o);
      }
      registerOnChange(n) {
        this.onChange = (i) => {
          (this.value = this._getOptionValue(i)), n(this.value);
        };
      }
      _registerOption() {
        return (this._idCounter++).toString();
      }
      _getOptionId(n) {
        for (let i of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(i), n)) return i;
        return null;
      }
      _getOptionValue(n) {
        let i = nT(n);
        return this._optionMap.has(i) ? this._optionMap.get(i) : n;
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = Vn(e)))(o || e);
      };
    })()),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["select", "formControlName", "", 3, "multiple", ""],
          ["select", "formControl", "", 3, "multiple", ""],
          ["select", "ngModel", "", 3, "multiple", ""],
        ],
        hostBindings: function (i, o) {
          i & 1 &&
            z("change", function (a) {
              return o.onChange(a.target.value);
            })("blur", function () {
              return o.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        features: [pr([tT]), Pt],
      }));
    let t = e;
    return t;
  })(),
  Al = (() => {
    let e = class e {
      constructor(n, i, o) {
        (this._element = n),
          (this._renderer = i),
          (this._select = o),
          this._select && (this.id = this._select._registerOption());
      }
      set ngValue(n) {
        this._select != null &&
          (this._select._optionMap.set(this.id, n),
          this._setElementValue(Uv(this.id, n)),
          this._select.writeValue(this._select.value));
      }
      set value(n) {
        this._setElementValue(n),
          this._select && this._select.writeValue(this._select.value);
      }
      _setElementValue(n) {
        this._renderer.setProperty(this._element.nativeElement, "value", n);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w($e), w(qt), w(Hv, 9));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
      }));
    let t = e;
    return t;
  })(),
  rT = { provide: No, useExisting: hn(() => mi), multi: !0 };
function xv(t, e) {
  return t == null
    ? `${e}`
    : (typeof e == "string" && (e = `'${e}'`),
      e && typeof e == "object" && (e = "Object"),
      `${t}: ${e}`.slice(0, 50));
}
function iT(t) {
  return t.split(":")[0];
}
var mi = (() => {
    let e = class e extends xl {
      constructor() {
        super(...arguments),
          (this._optionMap = new Map()),
          (this._idCounter = 0),
          (this._compareWith = Object.is);
      }
      set compareWith(n) {
        this._compareWith = n;
      }
      writeValue(n) {
        this.value = n;
        let i;
        if (Array.isArray(n)) {
          let o = n.map((s) => this._getOptionId(s));
          i = (s, a) => {
            s._setSelected(o.indexOf(a.toString()) > -1);
          };
        } else
          i = (o, s) => {
            o._setSelected(!1);
          };
        this._optionMap.forEach(i);
      }
      registerOnChange(n) {
        this.onChange = (i) => {
          let o = [],
            s = i.selectedOptions;
          if (s !== void 0) {
            let a = s;
            for (let l = 0; l < a.length; l++) {
              let c = a[l],
                u = this._getOptionValue(c.value);
              o.push(u);
            }
          } else {
            let a = i.options;
            for (let l = 0; l < a.length; l++) {
              let c = a[l];
              if (c.selected) {
                let u = this._getOptionValue(c.value);
                o.push(u);
              }
            }
          }
          (this.value = o), n(o);
        };
      }
      _registerOption(n) {
        let i = (this._idCounter++).toString();
        return this._optionMap.set(i, n), i;
      }
      _getOptionId(n) {
        for (let i of this._optionMap.keys())
          if (this._compareWith(this._optionMap.get(i)._value, n)) return i;
        return null;
      }
      _getOptionValue(n) {
        let i = iT(n);
        return this._optionMap.has(i) ? this._optionMap.get(i)._value : n;
      }
    };
    (e.ɵfac = (() => {
      let n;
      return function (o) {
        return (n || (n = Vn(e)))(o || e);
      };
    })()),
      (e.ɵdir = Ce({
        type: e,
        selectors: [
          ["select", "multiple", "", "formControlName", ""],
          ["select", "multiple", "", "formControl", ""],
          ["select", "multiple", "", "ngModel", ""],
        ],
        hostBindings: function (i, o) {
          i & 1 &&
            z("change", function (a) {
              return o.onChange(a.target);
            })("blur", function () {
              return o.onTouched();
            });
        },
        inputs: { compareWith: "compareWith" },
        features: [pr([rT]), Pt],
      }));
    let t = e;
    return t;
  })(),
  Nl = (() => {
    let e = class e {
      constructor(n, i, o) {
        (this._element = n),
          (this._renderer = i),
          (this._select = o),
          this._select && (this.id = this._select._registerOption(this));
      }
      set ngValue(n) {
        this._select != null &&
          ((this._value = n),
          this._setElementValue(xv(this.id, n)),
          this._select.writeValue(this._select.value));
      }
      set value(n) {
        this._select
          ? ((this._value = n),
            this._setElementValue(xv(this.id, n)),
            this._select.writeValue(this._select.value))
          : this._setElementValue(n);
      }
      _setElementValue(n) {
        this._renderer.setProperty(this._element.nativeElement, "value", n);
      }
      _setSelected(n) {
        this._renderer.setProperty(this._element.nativeElement, "selected", n);
      }
      ngOnDestroy() {
        this._select &&
          (this._select._optionMap.delete(this.id),
          this._select.writeValue(this._select.value));
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w($e), w(qt), w(mi, 9));
    }),
      (e.ɵdir = Ce({
        type: e,
        selectors: [["option"]],
        inputs: { ngValue: "ngValue", value: "value" },
      }));
    let t = e;
    return t;
  })();
var oT = (() => {
  let e = class e {};
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵmod = Re({ type: e })),
    (e.ɵinj = Ne({}));
  let t = e;
  return t;
})();
var zv = (() => {
  let e = class e {
    static withConfig(n) {
      return {
        ngModule: e,
        providers: [{ provide: jf, useValue: n.callSetDisabledState ?? Bf }],
      };
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵmod = Re({ type: e })),
    (e.ɵinj = Ne({ imports: [oT] }));
  let t = e;
  return t;
})();
var Wv = (() => {
  let e = class e {
    constructor(n, i) {
      (this.categoryService = n),
        (this.router = i),
        (this.model = { name: "", urlHandle: "" });
    }
    onSubmit() {
      this.subscription = this.categoryService
        .addCategory(this.model)
        .subscribe({
          next: (n) => {
            this.router.navigate(["/admin/categories"]);
          },
        });
    }
    ngOnDestroy() {
      this.subscription && this.subscription.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(nn), w(ve));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-add-category"]],
      decls: 17,
      vars: 2,
      consts: [
        ["form", "ngForm"],
        [1, "container"],
        [1, "mt-3"],
        [3, "ngSubmit"],
        [1, "mt-2"],
        [1, "form-label"],
        [
          "type",
          "text",
          "name",
          "categoryName",
          "id",
          "categoryName",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "text",
          "name",
          "categoryUrlHandle",
          "id",
          "categoryUrlHandle",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        ["type", "submit", 1, "btn", "btn-primary"],
      ],
      template: function (i, o) {
        if (i & 1) {
          let s = Ve();
          p(0, "div", 1)(1, "h1", 2),
            m(2, "Add Category"),
            h(),
            p(3, "form", 3, 0),
            z("ngSubmit", function () {
              return R(s), O(o.onSubmit());
            }),
            p(5, "div", 4)(6, "div", 2)(7, "label", 5),
            m(8, "Category Name"),
            h(),
            p(9, "input", 6),
            Y("ngModelChange", function (l) {
              return R(s), J(o.model.name, l) || (o.model.name = l), O(l);
            }),
            h()(),
            p(10, "div", 2)(11, "label", 5),
            m(12, "Category Url Handle"),
            h(),
            p(13, "input", 7),
            Y("ngModelChange", function (l) {
              return (
                R(s), J(o.model.urlHandle, l) || (o.model.urlHandle = l), O(l)
              );
            }),
            h()(),
            p(14, "div", 2)(15, "button", 8),
            m(16, "Save"),
            h()()()()();
        }
        i & 2 &&
          (y(9),
          Q("ngModel", o.model.name),
          y(4),
          Q("ngModel", o.model.urlHandle));
      },
      dependencies: [It, ot, Ct, Et, pt, ht],
    }));
  let t = e;
  return t;
})();
function sT(t, e) {
  t & 1 && (p(0, "div", 12), m(1, " Category not found! "), h());
}
var Gv = (() => {
  let e = class e {
    constructor(n, i, o) {
      (this.route = n),
        (this.categoryService = i),
        (this.router = o),
        (this.id = null),
        (this.category = { id: "", name: "", urlHandle: "" });
    }
    ngOnInit() {
      (this.idSubscription = this.route.paramMap.subscribe({
        next: (n) => {
          this.id = n.get("id");
        },
      })),
        this.id &&
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (n) => {
              this.category = n;
            },
          });
    }
    onSubmit() {
      let n = {
        name: this.category?.name,
        urlHandle: this.category?.urlHandle,
      };
      this.id &&
        (this.editCategorySubscription = this.categoryService
          .updateCategory(this.id, n)
          .subscribe({
            next: (i) => {
              this.router.navigate(["/admin/categories"]);
            },
          }));
    }
    onDelete() {
      this.id &&
        (this.deleteCategorySubscription = this.categoryService
          .deleteCategory(this.id)
          .subscribe({
            next: (n) => {
              this.router.navigate(["/admin/categories"]);
            },
          }));
    }
    ngOnDestroy() {
      this.idSubscription && this.idSubscription.unsubscribe(),
        this.editCategorySubscription &&
          this.editCategorySubscription.unsubscribe(),
        this.deleteCategorySubscription &&
          this.deleteCategorySubscription.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(ft), w(nn), w(ve));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-edit-category"]],
      decls: 25,
      vars: 4,
      consts: [
        ["form", "ngForm"],
        [1, "container"],
        [1, "mt-3"],
        [3, "ngSubmit"],
        [1, "mt-2"],
        [1, "form-label"],
        [
          "type",
          "text",
          "disabled",
          "",
          "name",
          "categoryId",
          "id",
          "categoryId",
          1,
          "form-control",
          3,
          "value",
        ],
        [
          "type",
          "text",
          "name",
          "categoryName",
          "id",
          "categoryName",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "text",
          "name",
          "categoryUrlHandle",
          "id",
          "categoryUrlHandle",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        ["type", "submit", 1, "btn", "btn-primary"],
        ["type", "button", 1, "btn", "btn-danger", 3, "click"],
        ["class", "alert alert-warning", "role", "alert", 4, "ngIf"],
        ["role", "alert", 1, "alert", "alert-warning"],
      ],
      template: function (i, o) {
        if (i & 1) {
          let s = Ve();
          p(0, "div", 1)(1, "h1", 2),
            m(2, "Edit Category"),
            h(),
            p(3, "form", 3, 0),
            z("ngSubmit", function () {
              return R(s), O(o.onSubmit());
            }),
            p(5, "div", 4)(6, "div", 2)(7, "label", 5),
            m(8, "Category Id"),
            h(),
            ne(9, "input", 6),
            h(),
            p(10, "div", 2)(11, "label", 5),
            m(12, "Category Name"),
            h(),
            p(13, "input", 7),
            Y("ngModelChange", function (l) {
              return R(s), J(o.category.name, l) || (o.category.name = l), O(l);
            }),
            h()(),
            p(14, "div", 2)(15, "label", 5),
            m(16, "Category UrlHandle"),
            h(),
            p(17, "input", 8),
            Y("ngModelChange", function (l) {
              return (
                R(s),
                J(o.category.urlHandle, l) || (o.category.urlHandle = l),
                O(l)
              );
            }),
            h()(),
            p(18, "div", 2)(19, "button", 9),
            m(20, "Save"),
            h(),
            m(21, " | "),
            p(22, "button", 10),
            z("click", function () {
              return R(s), O(o.onDelete());
            }),
            m(23, " Delete "),
            h()()()(),
            G(24, sT, 2, 0, "div", 11),
            h();
        }
        i & 2 &&
          (y(9),
          T("value", o.category.id),
          y(4),
          Q("ngModel", o.category.name),
          y(4),
          Q("ngModel", o.category.urlHandle),
          y(7),
          T("ngIf", !o.category));
      },
      dependencies: [Oe, It, ot, Ct, Et, pt, ht],
    }));
  let t = e;
  return t;
})();
var rn = (() => {
  let e = class e {
    constructor(n) {
      this.http = n;
    }
    createBlogPost(n) {
      return this.http.post(`${Pe.baseApiUrl}/api/blogposts?addAuth=true`, n);
    }
    getAllBlogPosts() {
      return this.http.get(`${Pe.baseApiUrl}/api/blogposts`);
    }
    getById(n) {
      return this.http.get(`${Pe.baseApiUrl}/api/blogposts/${n}`);
    }
    updateBlogPostById(n, i) {
      return this.http.put(
        `${Pe.baseApiUrl}/api/blogposts/${n}?addAuth=true`,
        i
      );
    }
    deleteBlogPostById(n) {
      return this.http.delete(
        `${Pe.baseApiUrl}/api/blogposts/${n}?addAuth=true`
      );
    }
    getBlogPostByUrl(n) {
      return this.http.get(`${Pe.baseApiUrl}/api/blogposts/${n}`);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Vt));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var aT = () => ["/admin/blogposts/add"],
  lT = (t) => ["/admin/blogposts", t];
function cT(t, e) {
  if ((t & 1 && (p(0, "span")(1, "span", 9), m(2), h()()), t & 2)) {
    let r = e.$implicit;
    y(2), re(r.name);
  }
}
function uT(t, e) {
  if (
    (t & 1 &&
      (p(0, "tr")(1, "td"),
      m(2),
      h(),
      p(3, "td"),
      m(4),
      h(),
      p(5, "td"),
      m(6),
      h(),
      p(7, "td"),
      G(8, cT, 3, 1, "span", 7),
      h(),
      p(9, "td")(10, "a", 8),
      m(11, "Edit"),
      h()()()),
    t & 2)
  ) {
    let r = e.$implicit;
    y(2),
      re(r.title),
      y(2),
      re(r.shortDescription),
      y(2),
      re(r.isVisible),
      y(2),
      T("ngForOf", r.categories),
      y(2),
      T("routerLink", Jr(5, lT, r.id));
  }
}
function dT(t, e) {
  if (
    (t & 1 &&
      (p(0, "table", 5)(1, "thead")(2, "tr")(3, "th", 6),
      m(4, "Title"),
      h(),
      p(5, "th", 6),
      m(6, "Short Description"),
      h(),
      p(7, "th", 6),
      m(8, "Is Visible?"),
      h(),
      p(9, "th", 6),
      m(10, "Categories"),
      h(),
      ne(11, "th", 6),
      h()(),
      p(12, "tbody"),
      G(13, uT, 12, 7, "tr", 7),
      h()()),
    t & 2)
  ) {
    let r = e.ngIf;
    y(13), T("ngForOf", r);
  }
}
var qv = (() => {
  let e = class e {
    constructor(n) {
      this.blogPostService = n;
    }
    ngOnInit() {
      this.blogPosts$ = this.blogPostService.getAllBlogPosts();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(rn));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-blog-post-list"]],
      decls: 8,
      vars: 5,
      consts: [
        [1, "container"],
        [1, "mt-3"],
        [1, "d-flex", "justify-content-end", "mt-3"],
        [1, "btn", "btn-primary", 3, "routerLink"],
        ["class", "table table-bordered mt-3", 4, "ngIf"],
        [1, "table", "table-bordered", "mt-3"],
        ["scope", "col"],
        [4, "ngFor", "ngForOf"],
        [1, "btn", "btn-light", "mx-3", "mt-1", "mb-1", 3, "routerLink"],
        [1, "badge", "bg-secondary", "me-2"],
      ],
      template: function (i, o) {
        i & 1 &&
          (p(0, "div", 0)(1, "h1", 1),
          m(2, "BlogPost List"),
          h(),
          p(3, "div", 2)(4, "a", 3),
          m(5, "Add Blog Post"),
          h()(),
          G(6, dT, 14, 1, "table", 4),
          Me(7, "async"),
          h()),
          i & 2 &&
            (y(4),
            T("routerLink", Bn(4, aT)),
            y(2),
            T("ngIf", je(7, 2, o.blogPosts$)));
      },
      dependencies: [it, Oe, Qn, ze],
    }));
  let t = e;
  return t;
})();
var vi = (() => {
  let e = class e {
    constructor(n) {
      (this.http = n),
        (this.selectedImage = new we({
          id: "",
          fileExtension: "",
          title: "",
          url: "",
          fileName: "",
        }));
    }
    uploadImage(n, i, o) {
      let s = new FormData();
      return (
        s.append("file", n),
        s.append("fileName", i),
        s.append("title", o),
        this.http.post(`${Pe.baseApiUrl}/api/images`, s)
      );
    }
    getAllImages() {
      return this.http.get(`${Pe.baseApiUrl}/api/images`);
    }
    selectImage(n) {
      this.selectedImage.next(n);
    }
    onSelectImage() {
      return this.selectedImage.asObservable();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Vt));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
function zf() {
  return {
    async: !1,
    breaks: !1,
    extensions: null,
    gfm: !0,
    hooks: null,
    pedantic: !1,
    renderer: null,
    silent: !1,
    tokenizer: null,
    walkTokens: null,
  };
}
var br = zf();
function Jv(t) {
  br = t;
}
var e0 = /[&<>"']/,
  fT = new RegExp(e0.source, "g"),
  t0 = /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
  hT = new RegExp(t0.source, "g"),
  pT = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
  Zv = (t) => pT[t];
function gt(t, e) {
  if (e) {
    if (e0.test(t)) return t.replace(fT, Zv);
  } else if (t0.test(t)) return t.replace(hT, Zv);
  return t;
}
var gT = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
function mT(t) {
  return t.replace(
    gT,
    (e, r) => (
      (r = r.toLowerCase()),
      r === "colon"
        ? ":"
        : r.charAt(0) === "#"
        ? r.charAt(1) === "x"
          ? String.fromCharCode(parseInt(r.substring(2), 16))
          : String.fromCharCode(+r.substring(1))
        : ""
    )
  );
}
var yT = /(^|[^\[])\^/g;
function oe(t, e) {
  let r = typeof t == "string" ? t : t.source;
  e = e || "";
  let n = {
    replace: (i, o) => {
      let s = typeof o == "string" ? o : o.source;
      return (s = s.replace(yT, "$1")), (r = r.replace(i, s)), n;
    },
    getRegex: () => new RegExp(r, e),
  };
  return n;
}
function Qv(t) {
  try {
    t = encodeURI(t).replace(/%25/g, "%");
  } catch {
    return null;
  }
  return t;
}
var Po = { exec: () => null };
function Yv(t, e) {
  let r = t.replace(/\|/g, (o, s, a) => {
      let l = !1,
        c = s;
      for (; --c >= 0 && a[c] === "\\"; ) l = !l;
      return l ? "|" : " |";
    }),
    n = r.split(/ \|/),
    i = 0;
  if (
    (n[0].trim() || n.shift(),
    n.length > 0 && !n[n.length - 1].trim() && n.pop(),
    e)
  )
    if (n.length > e) n.splice(e);
    else for (; n.length < e; ) n.push("");
  for (; i < n.length; i++) n[i] = n[i].trim().replace(/\\\|/g, "|");
  return n;
}
function Rl(t, e, r) {
  let n = t.length;
  if (n === 0) return "";
  let i = 0;
  for (; i < n; ) {
    let o = t.charAt(n - i - 1);
    if (o === e && !r) i++;
    else if (o !== e && r) i++;
    else break;
  }
  return t.slice(0, n - i);
}
function vT(t, e) {
  if (t.indexOf(e[1]) === -1) return -1;
  let r = 0;
  for (let n = 0; n < t.length; n++)
    if (t[n] === "\\") n++;
    else if (t[n] === e[0]) r++;
    else if (t[n] === e[1] && (r--, r < 0)) return n;
  return -1;
}
function Kv(t, e, r, n) {
  let i = e.href,
    o = e.title ? gt(e.title) : null,
    s = t[1].replace(/\\([\[\]])/g, "$1");
  if (t[0].charAt(0) !== "!") {
    n.state.inLink = !0;
    let a = {
      type: "link",
      raw: r,
      href: i,
      title: o,
      text: s,
      tokens: n.inlineTokens(s),
    };
    return (n.state.inLink = !1), a;
  }
  return { type: "image", raw: r, href: i, title: o, text: gt(s) };
}
function DT(t, e) {
  let r = t.match(/^(\s+)(?:```)/);
  if (r === null) return e;
  let n = r[1];
  return e
    .split(
      `
`
    )
    .map((i) => {
      let o = i.match(/^\s+/);
      if (o === null) return i;
      let [s] = o;
      return s.length >= n.length ? i.slice(n.length) : i;
    }).join(`
`);
}
var wi = class {
    options;
    rules;
    lexer;
    constructor(e) {
      this.options = e || br;
    }
    space(e) {
      let r = this.rules.block.newline.exec(e);
      if (r && r[0].length > 0) return { type: "space", raw: r[0] };
    }
    code(e) {
      let r = this.rules.block.code.exec(e);
      if (r) {
        let n = r[0].replace(/^ {1,4}/gm, "");
        return {
          type: "code",
          raw: r[0],
          codeBlockStyle: "indented",
          text: this.options.pedantic
            ? n
            : Rl(
                n,
                `
`
              ),
        };
      }
    }
    fences(e) {
      let r = this.rules.block.fences.exec(e);
      if (r) {
        let n = r[0],
          i = DT(n, r[3] || "");
        return {
          type: "code",
          raw: n,
          lang: r[2]
            ? r[2].trim().replace(this.rules.inline.anyPunctuation, "$1")
            : r[2],
          text: i,
        };
      }
    }
    heading(e) {
      let r = this.rules.block.heading.exec(e);
      if (r) {
        let n = r[2].trim();
        if (/#$/.test(n)) {
          let i = Rl(n, "#");
          (this.options.pedantic || !i || / $/.test(i)) && (n = i.trim());
        }
        return {
          type: "heading",
          raw: r[0],
          depth: r[1].length,
          text: n,
          tokens: this.lexer.inline(n),
        };
      }
    }
    hr(e) {
      let r = this.rules.block.hr.exec(e);
      if (r) return { type: "hr", raw: r[0] };
    }
    blockquote(e) {
      let r = this.rules.block.blockquote.exec(e);
      if (r) {
        let n = r[0].replace(
          /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
          `
    $1`
        );
        n = Rl(
          n.replace(/^ *>[ \t]?/gm, ""),
          `
`
        );
        let i = this.lexer.state.top;
        this.lexer.state.top = !0;
        let o = this.lexer.blockTokens(n);
        return (
          (this.lexer.state.top = i),
          { type: "blockquote", raw: r[0], tokens: o, text: n }
        );
      }
    }
    list(e) {
      let r = this.rules.block.list.exec(e);
      if (r) {
        let n = r[1].trim(),
          i = n.length > 1,
          o = {
            type: "list",
            raw: "",
            ordered: i,
            start: i ? +n.slice(0, -1) : "",
            loose: !1,
            items: [],
          };
        (n = i ? `\\d{1,9}\\${n.slice(-1)}` : `\\${n}`),
          this.options.pedantic && (n = i ? n : "[*+-]");
        let s = new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),
          a = "",
          l = "",
          c = !1;
        for (; e; ) {
          let u = !1;
          if (!(r = s.exec(e)) || this.rules.block.hr.test(e)) break;
          (a = r[0]), (e = e.substring(a.length));
          let d = r[2]
              .split(
                `
`,
                1
              )[0]
              .replace(/^\t+/, (M) => " ".repeat(3 * M.length)),
            f = e.split(
              `
`,
              1
            )[0],
            g = 0;
          this.options.pedantic
            ? ((g = 2), (l = d.trimStart()))
            : ((g = r[2].search(/[^ ]/)),
              (g = g > 4 ? 1 : g),
              (l = d.slice(g)),
              (g += r[1].length));
          let C = !1;
          if (
            (!d &&
              /^ *$/.test(f) &&
              ((a +=
                f +
                `
`),
              (e = e.substring(f.length + 1)),
              (u = !0)),
            !u)
          ) {
            let M = new RegExp(
                `^ {0,${Math.min(
                  3,
                  g - 1
                )}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`
              ),
              ge = new RegExp(
                `^ {0,${Math.min(
                  3,
                  g - 1
                )}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`
              ),
              Ie = new RegExp(`^ {0,${Math.min(3, g - 1)}}(?:\`\`\`|~~~)`),
              se = new RegExp(`^ {0,${Math.min(3, g - 1)}}#`);
            for (; e; ) {
              let Xe = e.split(
                `
`,
                1
              )[0];
              if (
                ((f = Xe),
                this.options.pedantic &&
                  (f = f.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
                Ie.test(f) || se.test(f) || M.test(f) || ge.test(e))
              )
                break;
              if (f.search(/[^ ]/) >= g || !f.trim())
                l +=
                  `
` + f.slice(g);
              else {
                if (
                  C ||
                  d.search(/[^ ]/) >= 4 ||
                  Ie.test(d) ||
                  se.test(d) ||
                  ge.test(d)
                )
                  break;
                l +=
                  `
` + f;
              }
              !C && !f.trim() && (C = !0),
                (a +=
                  Xe +
                  `
`),
                (e = e.substring(Xe.length + 1)),
                (d = f.slice(g));
            }
          }
          o.loose || (c ? (o.loose = !0) : /\n *\n *$/.test(a) && (c = !0));
          let I = null,
            x;
          this.options.gfm &&
            ((I = /^\[[ xX]\] /.exec(l)),
            I && ((x = I[0] !== "[ ] "), (l = l.replace(/^\[[ xX]\] +/, "")))),
            o.items.push({
              type: "list_item",
              raw: a,
              task: !!I,
              checked: x,
              loose: !1,
              text: l,
              tokens: [],
            }),
            (o.raw += a);
        }
        (o.items[o.items.length - 1].raw = a.trimEnd()),
          (o.items[o.items.length - 1].text = l.trimEnd()),
          (o.raw = o.raw.trimEnd());
        for (let u = 0; u < o.items.length; u++)
          if (
            ((this.lexer.state.top = !1),
            (o.items[u].tokens = this.lexer.blockTokens(o.items[u].text, [])),
            !o.loose)
          ) {
            let d = o.items[u].tokens.filter((g) => g.type === "space"),
              f = d.length > 0 && d.some((g) => /\n.*\n/.test(g.raw));
            o.loose = f;
          }
        if (o.loose)
          for (let u = 0; u < o.items.length; u++) o.items[u].loose = !0;
        return o;
      }
    }
    html(e) {
      let r = this.rules.block.html.exec(e);
      if (r)
        return {
          type: "html",
          block: !0,
          raw: r[0],
          pre: r[1] === "pre" || r[1] === "script" || r[1] === "style",
          text: r[0],
        };
    }
    def(e) {
      let r = this.rules.block.def.exec(e);
      if (r) {
        let n = r[1].toLowerCase().replace(/\s+/g, " "),
          i = r[2]
            ? r[2]
                .replace(/^<(.*)>$/, "$1")
                .replace(this.rules.inline.anyPunctuation, "$1")
            : "",
          o = r[3]
            ? r[3]
                .substring(1, r[3].length - 1)
                .replace(this.rules.inline.anyPunctuation, "$1")
            : r[3];
        return { type: "def", tag: n, raw: r[0], href: i, title: o };
      }
    }
    table(e) {
      let r = this.rules.block.table.exec(e);
      if (!r || !/[:|]/.test(r[2])) return;
      let n = Yv(r[1]),
        i = r[2].replace(/^\||\| *$/g, "").split("|"),
        o =
          r[3] && r[3].trim()
            ? r[3].replace(/\n[ \t]*$/, "").split(`
`)
            : [],
        s = { type: "table", raw: r[0], header: [], align: [], rows: [] };
      if (n.length === i.length) {
        for (let a of i)
          /^ *-+: *$/.test(a)
            ? s.align.push("right")
            : /^ *:-+: *$/.test(a)
            ? s.align.push("center")
            : /^ *:-+ *$/.test(a)
            ? s.align.push("left")
            : s.align.push(null);
        for (let a of n)
          s.header.push({ text: a, tokens: this.lexer.inline(a) });
        for (let a of o)
          s.rows.push(
            Yv(a, s.header.length).map((l) => ({
              text: l,
              tokens: this.lexer.inline(l),
            }))
          );
        return s;
      }
    }
    lheading(e) {
      let r = this.rules.block.lheading.exec(e);
      if (r)
        return {
          type: "heading",
          raw: r[0],
          depth: r[2].charAt(0) === "=" ? 1 : 2,
          text: r[1],
          tokens: this.lexer.inline(r[1]),
        };
    }
    paragraph(e) {
      let r = this.rules.block.paragraph.exec(e);
      if (r) {
        let n =
          r[1].charAt(r[1].length - 1) ===
          `
`
            ? r[1].slice(0, -1)
            : r[1];
        return {
          type: "paragraph",
          raw: r[0],
          text: n,
          tokens: this.lexer.inline(n),
        };
      }
    }
    text(e) {
      let r = this.rules.block.text.exec(e);
      if (r)
        return {
          type: "text",
          raw: r[0],
          text: r[0],
          tokens: this.lexer.inline(r[0]),
        };
    }
    escape(e) {
      let r = this.rules.inline.escape.exec(e);
      if (r) return { type: "escape", raw: r[0], text: gt(r[1]) };
    }
    tag(e) {
      let r = this.rules.inline.tag.exec(e);
      if (r)
        return (
          !this.lexer.state.inLink && /^<a /i.test(r[0])
            ? (this.lexer.state.inLink = !0)
            : this.lexer.state.inLink &&
              /^<\/a>/i.test(r[0]) &&
              (this.lexer.state.inLink = !1),
          !this.lexer.state.inRawBlock &&
          /^<(pre|code|kbd|script)(\s|>)/i.test(r[0])
            ? (this.lexer.state.inRawBlock = !0)
            : this.lexer.state.inRawBlock &&
              /^<\/(pre|code|kbd|script)(\s|>)/i.test(r[0]) &&
              (this.lexer.state.inRawBlock = !1),
          {
            type: "html",
            raw: r[0],
            inLink: this.lexer.state.inLink,
            inRawBlock: this.lexer.state.inRawBlock,
            block: !1,
            text: r[0],
          }
        );
    }
    link(e) {
      let r = this.rules.inline.link.exec(e);
      if (r) {
        let n = r[2].trim();
        if (!this.options.pedantic && /^</.test(n)) {
          if (!/>$/.test(n)) return;
          let s = Rl(n.slice(0, -1), "\\");
          if ((n.length - s.length) % 2 === 0) return;
        } else {
          let s = vT(r[2], "()");
          if (s > -1) {
            let l = (r[0].indexOf("!") === 0 ? 5 : 4) + r[1].length + s;
            (r[2] = r[2].substring(0, s)),
              (r[0] = r[0].substring(0, l).trim()),
              (r[3] = "");
          }
        }
        let i = r[2],
          o = "";
        if (this.options.pedantic) {
          let s = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
          s && ((i = s[1]), (o = s[3]));
        } else o = r[3] ? r[3].slice(1, -1) : "";
        return (
          (i = i.trim()),
          /^</.test(i) &&
            (this.options.pedantic && !/>$/.test(n)
              ? (i = i.slice(1))
              : (i = i.slice(1, -1))),
          Kv(
            r,
            {
              href: i && i.replace(this.rules.inline.anyPunctuation, "$1"),
              title: o && o.replace(this.rules.inline.anyPunctuation, "$1"),
            },
            r[0],
            this.lexer
          )
        );
      }
    }
    reflink(e, r) {
      let n;
      if (
        (n = this.rules.inline.reflink.exec(e)) ||
        (n = this.rules.inline.nolink.exec(e))
      ) {
        let i = (n[2] || n[1]).replace(/\s+/g, " "),
          o = r[i.toLowerCase()];
        if (!o) {
          let s = n[0].charAt(0);
          return { type: "text", raw: s, text: s };
        }
        return Kv(n, o, n[0], this.lexer);
      }
    }
    emStrong(e, r, n = "") {
      let i = this.rules.inline.emStrongLDelim.exec(e);
      if (!i || (i[3] && n.match(/[\p{L}\p{N}]/u))) return;
      if (
        !(i[1] || i[2] || "") ||
        !n ||
        this.rules.inline.punctuation.exec(n)
      ) {
        let s = [...i[0]].length - 1,
          a,
          l,
          c = s,
          u = 0,
          d =
            i[0][0] === "*"
              ? this.rules.inline.emStrongRDelimAst
              : this.rules.inline.emStrongRDelimUnd;
        for (
          d.lastIndex = 0, r = r.slice(-1 * e.length + s);
          (i = d.exec(r)) != null;

        ) {
          if (((a = i[1] || i[2] || i[3] || i[4] || i[5] || i[6]), !a))
            continue;
          if (((l = [...a].length), i[3] || i[4])) {
            c += l;
            continue;
          } else if ((i[5] || i[6]) && s % 3 && !((s + l) % 3)) {
            u += l;
            continue;
          }
          if (((c -= l), c > 0)) continue;
          l = Math.min(l, l + c + u);
          let f = [...i[0]][0].length,
            g = e.slice(0, s + i.index + f + l);
          if (Math.min(s, l) % 2) {
            let I = g.slice(1, -1);
            return {
              type: "em",
              raw: g,
              text: I,
              tokens: this.lexer.inlineTokens(I),
            };
          }
          let C = g.slice(2, -2);
          return {
            type: "strong",
            raw: g,
            text: C,
            tokens: this.lexer.inlineTokens(C),
          };
        }
      }
    }
    codespan(e) {
      let r = this.rules.inline.code.exec(e);
      if (r) {
        let n = r[2].replace(/\n/g, " "),
          i = /[^ ]/.test(n),
          o = /^ /.test(n) && / $/.test(n);
        return (
          i && o && (n = n.substring(1, n.length - 1)),
          (n = gt(n, !0)),
          { type: "codespan", raw: r[0], text: n }
        );
      }
    }
    br(e) {
      let r = this.rules.inline.br.exec(e);
      if (r) return { type: "br", raw: r[0] };
    }
    del(e) {
      let r = this.rules.inline.del.exec(e);
      if (r)
        return {
          type: "del",
          raw: r[0],
          text: r[2],
          tokens: this.lexer.inlineTokens(r[2]),
        };
    }
    autolink(e) {
      let r = this.rules.inline.autolink.exec(e);
      if (r) {
        let n, i;
        return (
          r[2] === "@"
            ? ((n = gt(r[1])), (i = "mailto:" + n))
            : ((n = gt(r[1])), (i = n)),
          {
            type: "link",
            raw: r[0],
            text: n,
            href: i,
            tokens: [{ type: "text", raw: n, text: n }],
          }
        );
      }
    }
    url(e) {
      let r;
      if ((r = this.rules.inline.url.exec(e))) {
        let n, i;
        if (r[2] === "@") (n = gt(r[0])), (i = "mailto:" + n);
        else {
          let o;
          do
            (o = r[0]),
              (r[0] = this.rules.inline._backpedal.exec(r[0])?.[0] ?? "");
          while (o !== r[0]);
          (n = gt(r[0])), r[1] === "www." ? (i = "http://" + r[0]) : (i = r[0]);
        }
        return {
          type: "link",
          raw: r[0],
          text: n,
          href: i,
          tokens: [{ type: "text", raw: n, text: n }],
        };
      }
    }
    inlineText(e) {
      let r = this.rules.inline.text.exec(e);
      if (r) {
        let n;
        return (
          this.lexer.state.inRawBlock ? (n = r[0]) : (n = gt(r[0])),
          { type: "text", raw: r[0], text: n }
        );
      }
    }
  },
  wT = /^(?: *(?:\n|$))+/,
  bT = /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
  CT =
    /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
  Lo = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
  ET = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
  n0 = /(?:[*+-]|\d{1,9}[.)])/,
  r0 = oe(
    /^(?!bull |blockCode|fences|blockquote|heading|html)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html))+?)\n {0,3}(=+|-+) *(?:\n+|$)/
  )
    .replace(/bull/g, n0)
    .replace(/blockCode/g, / {4}/)
    .replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/)
    .replace(/blockquote/g, / {0,3}>/)
    .replace(/heading/g, / {0,3}#{1,6}/)
    .replace(/html/g, / {0,3}<[^\n>]+>\n/)
    .getRegex(),
  Wf =
    /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
  IT = /^[^\n]+/,
  Gf = /(?!\s*\])(?:\\.|[^\[\]\\])+/,
  _T = oe(
    /^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/
  )
    .replace("label", Gf)
    .replace(
      "title",
      /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/
    )
    .getRegex(),
  ST = oe(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/)
    .replace(/bull/g, n0)
    .getRegex(),
  Pl =
    "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",
  qf = /<!--(?:-?>|[\s\S]*?(?:-->|$))/,
  MT = oe(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
    "i"
  )
    .replace("comment", qf)
    .replace("tag", Pl)
    .replace(
      "attribute",
      / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
    )
    .getRegex(),
  i0 = oe(Wf)
    .replace("hr", Lo)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("|lheading", "")
    .replace("|table", "")
    .replace("blockquote", " {0,3}>")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", Pl)
    .getRegex(),
  xT = oe(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/)
    .replace("paragraph", i0)
    .getRegex(),
  Zf = {
    blockquote: xT,
    code: bT,
    def: _T,
    fences: CT,
    heading: ET,
    hr: Lo,
    html: MT,
    lheading: r0,
    list: ST,
    newline: wT,
    paragraph: i0,
    table: Po,
    text: IT,
  },
  Xv = oe(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  )
    .replace("hr", Lo)
    .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
    .replace("blockquote", " {0,3}>")
    .replace("code", " {4}[^\\n]")
    .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
    .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
    .replace(
      "html",
      "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
    )
    .replace("tag", Pl)
    .getRegex(),
  TT = Z(v({}, Zf), {
    table: Xv,
    paragraph: oe(Wf)
      .replace("hr", Lo)
      .replace("heading", " {0,3}#{1,6}(?:\\s|$)")
      .replace("|lheading", "")
      .replace("table", Xv)
      .replace("blockquote", " {0,3}>")
      .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
      .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
      .replace(
        "html",
        "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
      )
      .replace("tag", Pl)
      .getRegex(),
  }),
  AT = Z(v({}, Zf), {
    html: oe(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    )
      .replace("comment", qf)
      .replace(
        /tag/g,
        "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
      )
      .getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: Po,
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: oe(Wf)
      .replace("hr", Lo)
      .replace(
        "heading",
        ` *#{1,6} *[^
]`
      )
      .replace("lheading", r0)
      .replace("|table", "")
      .replace("blockquote", " {0,3}>")
      .replace("|fences", "")
      .replace("|list", "")
      .replace("|html", "")
      .replace("|tag", "")
      .getRegex(),
  }),
  o0 = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
  NT = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
  s0 = /^( {2,}|\\)\n(?!\s*$)/,
  RT =
    /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
  Vo = "\\p{P}\\p{S}",
  OT = oe(/^((?![*_])[\spunctuation])/, "u")
    .replace(/punctuation/g, Vo)
    .getRegex(),
  kT = /\[[^[\]]*?\]\([^\(\)]*?\)|`[^`]*?`|<[^<>]*?>/g,
  PT = oe(
    /^(?:\*+(?:((?!\*)[punct])|[^\s*]))|^_+(?:((?!_)[punct])|([^\s_]))/,
    "u"
  )
    .replace(/punct/g, Vo)
    .getRegex(),
  FT = oe(
    "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)[punct](\\*+)(?=[\\s]|$)|[^punct\\s](\\*+)(?!\\*)(?=[punct\\s]|$)|(?!\\*)[punct\\s](\\*+)(?=[^punct\\s])|[\\s](\\*+)(?!\\*)(?=[punct])|(?!\\*)[punct](\\*+)(?!\\*)(?=[punct])|[^punct\\s](\\*+)(?=[^punct\\s])",
    "gu"
  )
    .replace(/punct/g, Vo)
    .getRegex(),
  LT = oe(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)[punct](_+)(?=[\\s]|$)|[^punct\\s](_+)(?!_)(?=[punct\\s]|$)|(?!_)[punct\\s](_+)(?=[^punct\\s])|[\\s](_+)(?!_)(?=[punct])|(?!_)[punct](_+)(?!_)(?=[punct])",
    "gu"
  )
    .replace(/punct/g, Vo)
    .getRegex(),
  VT = oe(/\\([punct])/, "gu")
    .replace(/punct/g, Vo)
    .getRegex(),
  jT = oe(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/)
    .replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/)
    .replace(
      "email",
      /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/
    )
    .getRegex(),
  BT = oe(qf).replace("(?:-->|$)", "-->").getRegex(),
  $T = oe(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  )
    .replace("comment", BT)
    .replace(
      "attribute",
      /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/
    )
    .getRegex(),
  kl = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,
  UT = oe(/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/)
    .replace("label", kl)
    .replace("href", /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/)
    .replace(
      "title",
      /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/
    )
    .getRegex(),
  a0 = oe(/^!?\[(label)\]\[(ref)\]/)
    .replace("label", kl)
    .replace("ref", Gf)
    .getRegex(),
  l0 = oe(/^!?\[(ref)\](?:\[\])?/)
    .replace("ref", Gf)
    .getRegex(),
  HT = oe("reflink|nolink(?!\\()", "g")
    .replace("reflink", a0)
    .replace("nolink", l0)
    .getRegex(),
  Qf = {
    _backpedal: Po,
    anyPunctuation: VT,
    autolink: jT,
    blockSkip: kT,
    br: s0,
    code: NT,
    del: Po,
    emStrongLDelim: PT,
    emStrongRDelimAst: FT,
    emStrongRDelimUnd: LT,
    escape: o0,
    link: UT,
    nolink: l0,
    punctuation: OT,
    reflink: a0,
    reflinkSearch: HT,
    tag: $T,
    text: RT,
    url: Po,
  },
  zT = Z(v({}, Qf), {
    link: oe(/^!?\[(label)\]\((.*?)\)/)
      .replace("label", kl)
      .getRegex(),
    reflink: oe(/^!?\[(label)\]\s*\[([^\]]*)\]/)
      .replace("label", kl)
      .getRegex(),
  }),
  Uf = Z(v({}, Qf), {
    escape: oe(o0).replace("])", "~|])").getRegex(),
    url: oe(
      /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
      "i"
    )
      .replace(
        "email",
        /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/
      )
      .getRegex(),
    _backpedal:
      /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
  }),
  WT = Z(v({}, Uf), {
    br: oe(s0).replace("{2,}", "*").getRegex(),
    text: oe(Uf.text)
      .replace("\\b_", "\\b_| {2,}\\n")
      .replace(/\{2,\}/g, "*")
      .getRegex(),
  }),
  Ol = { normal: Zf, gfm: TT, pedantic: AT },
  ko = { normal: Qf, gfm: Uf, breaks: WT, pedantic: zT },
  En = class t {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(e) {
      (this.tokens = []),
        (this.tokens.links = Object.create(null)),
        (this.options = e || br),
        (this.options.tokenizer = this.options.tokenizer || new wi()),
        (this.tokenizer = this.options.tokenizer),
        (this.tokenizer.options = this.options),
        (this.tokenizer.lexer = this),
        (this.inlineQueue = []),
        (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
      let r = { block: Ol.normal, inline: ko.normal };
      this.options.pedantic
        ? ((r.block = Ol.pedantic), (r.inline = ko.pedantic))
        : this.options.gfm &&
          ((r.block = Ol.gfm),
          this.options.breaks ? (r.inline = ko.breaks) : (r.inline = ko.gfm)),
        (this.tokenizer.rules = r);
    }
    static get rules() {
      return { block: Ol, inline: ko };
    }
    static lex(e, r) {
      return new t(r).lex(e);
    }
    static lexInline(e, r) {
      return new t(r).inlineTokens(e);
    }
    lex(e) {
      (e = e.replace(
        /\r\n|\r/g,
        `
`
      )),
        this.blockTokens(e, this.tokens);
      for (let r = 0; r < this.inlineQueue.length; r++) {
        let n = this.inlineQueue[r];
        this.inlineTokens(n.src, n.tokens);
      }
      return (this.inlineQueue = []), this.tokens;
    }
    blockTokens(e, r = []) {
      this.options.pedantic
        ? (e = e.replace(/\t/g, "    ").replace(/^ +$/gm, ""))
        : (e = e.replace(
            /^( *)(\t+)/gm,
            (a, l, c) => l + "    ".repeat(c.length)
          ));
      let n, i, o, s;
      for (; e; )
        if (
          !(
            this.options.extensions &&
            this.options.extensions.block &&
            this.options.extensions.block.some((a) =>
              (n = a.call({ lexer: this }, e, r))
                ? ((e = e.substring(n.raw.length)), r.push(n), !0)
                : !1
            )
          )
        ) {
          if ((n = this.tokenizer.space(e))) {
            (e = e.substring(n.raw.length)),
              n.raw.length === 1 && r.length > 0
                ? (r[r.length - 1].raw += `
`)
                : r.push(n);
            continue;
          }
          if ((n = this.tokenizer.code(e))) {
            (e = e.substring(n.raw.length)),
              (i = r[r.length - 1]),
              i && (i.type === "paragraph" || i.type === "text")
                ? ((i.raw +=
                    `
` + n.raw),
                  (i.text +=
                    `
` + n.text),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
                : r.push(n);
            continue;
          }
          if ((n = this.tokenizer.fences(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.heading(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.hr(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.blockquote(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.list(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.html(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.def(e))) {
            (e = e.substring(n.raw.length)),
              (i = r[r.length - 1]),
              i && (i.type === "paragraph" || i.type === "text")
                ? ((i.raw +=
                    `
` + n.raw),
                  (i.text +=
                    `
` + n.raw),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
                : this.tokens.links[n.tag] ||
                  (this.tokens.links[n.tag] = { href: n.href, title: n.title });
            continue;
          }
          if ((n = this.tokenizer.table(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.lheading(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if (
            ((o = e),
            this.options.extensions && this.options.extensions.startBlock)
          ) {
            let a = 1 / 0,
              l = e.slice(1),
              c;
            this.options.extensions.startBlock.forEach((u) => {
              (c = u.call({ lexer: this }, l)),
                typeof c == "number" && c >= 0 && (a = Math.min(a, c));
            }),
              a < 1 / 0 && a >= 0 && (o = e.substring(0, a + 1));
          }
          if (this.state.top && (n = this.tokenizer.paragraph(o))) {
            (i = r[r.length - 1]),
              s && i.type === "paragraph"
                ? ((i.raw +=
                    `
` + n.raw),
                  (i.text +=
                    `
` + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
                : r.push(n),
              (s = o.length !== e.length),
              (e = e.substring(n.raw.length));
            continue;
          }
          if ((n = this.tokenizer.text(e))) {
            (e = e.substring(n.raw.length)),
              (i = r[r.length - 1]),
              i && i.type === "text"
                ? ((i.raw +=
                    `
` + n.raw),
                  (i.text +=
                    `
` + n.text),
                  this.inlineQueue.pop(),
                  (this.inlineQueue[this.inlineQueue.length - 1].src = i.text))
                : r.push(n);
            continue;
          }
          if (e) {
            let a = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(a);
              break;
            } else throw new Error(a);
          }
        }
      return (this.state.top = !0), r;
    }
    inline(e, r = []) {
      return this.inlineQueue.push({ src: e, tokens: r }), r;
    }
    inlineTokens(e, r = []) {
      let n,
        i,
        o,
        s = e,
        a,
        l,
        c;
      if (this.tokens.links) {
        let u = Object.keys(this.tokens.links);
        if (u.length > 0)
          for (
            ;
            (a = this.tokenizer.rules.inline.reflinkSearch.exec(s)) != null;

          )
            u.includes(a[0].slice(a[0].lastIndexOf("[") + 1, -1)) &&
              (s =
                s.slice(0, a.index) +
                "[" +
                "a".repeat(a[0].length - 2) +
                "]" +
                s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
      }
      for (; (a = this.tokenizer.rules.inline.blockSkip.exec(s)) != null; )
        s =
          s.slice(0, a.index) +
          "[" +
          "a".repeat(a[0].length - 2) +
          "]" +
          s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      for (; (a = this.tokenizer.rules.inline.anyPunctuation.exec(s)) != null; )
        s =
          s.slice(0, a.index) +
          "++" +
          s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      for (; e; )
        if (
          (l || (c = ""),
          (l = !1),
          !(
            this.options.extensions &&
            this.options.extensions.inline &&
            this.options.extensions.inline.some((u) =>
              (n = u.call({ lexer: this }, e, r))
                ? ((e = e.substring(n.raw.length)), r.push(n), !0)
                : !1
            )
          ))
        ) {
          if ((n = this.tokenizer.escape(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.tag(e))) {
            (e = e.substring(n.raw.length)),
              (i = r[r.length - 1]),
              i && n.type === "text" && i.type === "text"
                ? ((i.raw += n.raw), (i.text += n.text))
                : r.push(n);
            continue;
          }
          if ((n = this.tokenizer.link(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.reflink(e, this.tokens.links))) {
            (e = e.substring(n.raw.length)),
              (i = r[r.length - 1]),
              i && n.type === "text" && i.type === "text"
                ? ((i.raw += n.raw), (i.text += n.text))
                : r.push(n);
            continue;
          }
          if ((n = this.tokenizer.emStrong(e, s, c))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.codespan(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.br(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.del(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if ((n = this.tokenizer.autolink(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if (!this.state.inLink && (n = this.tokenizer.url(e))) {
            (e = e.substring(n.raw.length)), r.push(n);
            continue;
          }
          if (
            ((o = e),
            this.options.extensions && this.options.extensions.startInline)
          ) {
            let u = 1 / 0,
              d = e.slice(1),
              f;
            this.options.extensions.startInline.forEach((g) => {
              (f = g.call({ lexer: this }, d)),
                typeof f == "number" && f >= 0 && (u = Math.min(u, f));
            }),
              u < 1 / 0 && u >= 0 && (o = e.substring(0, u + 1));
          }
          if ((n = this.tokenizer.inlineText(o))) {
            (e = e.substring(n.raw.length)),
              n.raw.slice(-1) !== "_" && (c = n.raw.slice(-1)),
              (l = !0),
              (i = r[r.length - 1]),
              i && i.type === "text"
                ? ((i.raw += n.raw), (i.text += n.text))
                : r.push(n);
            continue;
          }
          if (e) {
            let u = "Infinite loop on byte: " + e.charCodeAt(0);
            if (this.options.silent) {
              console.error(u);
              break;
            } else throw new Error(u);
          }
        }
      return r;
    }
  },
  on = class {
    options;
    constructor(e) {
      this.options = e || br;
    }
    code(e, r, n) {
      let i = (r || "").match(/^\S*/)?.[0];
      return (
        (e =
          e.replace(/\n$/, "") +
          `
`),
        i
          ? '<pre><code class="language-' +
            gt(i) +
            '">' +
            (n ? e : gt(e, !0)) +
            `</code></pre>
`
          : "<pre><code>" +
            (n ? e : gt(e, !0)) +
            `</code></pre>
`
      );
    }
    blockquote(e) {
      return `<blockquote>
${e}</blockquote>
`;
    }
    html(e, r) {
      return e;
    }
    heading(e, r, n) {
      return `<h${r}>${e}</h${r}>
`;
    }
    hr() {
      return `<hr>
`;
    }
    list(e, r, n) {
      let i = r ? "ol" : "ul",
        o = r && n !== 1 ? ' start="' + n + '"' : "";
      return (
        "<" +
        i +
        o +
        `>
` +
        e +
        "</" +
        i +
        `>
`
      );
    }
    listitem(e, r, n) {
      return `<li>${e}</li>
`;
    }
    checkbox(e) {
      return (
        "<input " + (e ? 'checked="" ' : "") + 'disabled="" type="checkbox">'
      );
    }
    paragraph(e) {
      return `<p>${e}</p>
`;
    }
    table(e, r) {
      return (
        r && (r = `<tbody>${r}</tbody>`),
        `<table>
<thead>
` +
          e +
          `</thead>
` +
          r +
          `</table>
`
      );
    }
    tablerow(e) {
      return `<tr>
${e}</tr>
`;
    }
    tablecell(e, r) {
      let n = r.header ? "th" : "td";
      return (
        (r.align ? `<${n} align="${r.align}">` : `<${n}>`) +
        e +
        `</${n}>
`
      );
    }
    strong(e) {
      return `<strong>${e}</strong>`;
    }
    em(e) {
      return `<em>${e}</em>`;
    }
    codespan(e) {
      return `<code>${e}</code>`;
    }
    br() {
      return "<br>";
    }
    del(e) {
      return `<del>${e}</del>`;
    }
    link(e, r, n) {
      let i = Qv(e);
      if (i === null) return n;
      e = i;
      let o = '<a href="' + e + '"';
      return r && (o += ' title="' + r + '"'), (o += ">" + n + "</a>"), o;
    }
    image(e, r, n) {
      let i = Qv(e);
      if (i === null) return n;
      e = i;
      let o = `<img src="${e}" alt="${n}"`;
      return r && (o += ` title="${r}"`), (o += ">"), o;
    }
    text(e) {
      return e;
    }
  },
  Fo = class {
    strong(e) {
      return e;
    }
    em(e) {
      return e;
    }
    codespan(e) {
      return e;
    }
    del(e) {
      return e;
    }
    html(e) {
      return e;
    }
    text(e) {
      return e;
    }
    link(e, r, n) {
      return "" + n;
    }
    image(e, r, n) {
      return "" + n;
    }
    br() {
      return "";
    }
  },
  In = class t {
    options;
    renderer;
    textRenderer;
    constructor(e) {
      (this.options = e || br),
        (this.options.renderer = this.options.renderer || new on()),
        (this.renderer = this.options.renderer),
        (this.renderer.options = this.options),
        (this.textRenderer = new Fo());
    }
    static parse(e, r) {
      return new t(r).parse(e);
    }
    static parseInline(e, r) {
      return new t(r).parseInline(e);
    }
    parse(e, r = !0) {
      let n = "";
      for (let i = 0; i < e.length; i++) {
        let o = e[i];
        if (
          this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[o.type]
        ) {
          let s = o,
            a = this.options.extensions.renderers[s.type].call(
              { parser: this },
              s
            );
          if (
            a !== !1 ||
            ![
              "space",
              "hr",
              "heading",
              "code",
              "table",
              "blockquote",
              "list",
              "html",
              "paragraph",
              "text",
            ].includes(s.type)
          ) {
            n += a || "";
            continue;
          }
        }
        switch (o.type) {
          case "space":
            continue;
          case "hr": {
            n += this.renderer.hr();
            continue;
          }
          case "heading": {
            let s = o;
            n += this.renderer.heading(
              this.parseInline(s.tokens),
              s.depth,
              mT(this.parseInline(s.tokens, this.textRenderer))
            );
            continue;
          }
          case "code": {
            let s = o;
            n += this.renderer.code(s.text, s.lang, !!s.escaped);
            continue;
          }
          case "table": {
            let s = o,
              a = "",
              l = "";
            for (let u = 0; u < s.header.length; u++)
              l += this.renderer.tablecell(
                this.parseInline(s.header[u].tokens),
                { header: !0, align: s.align[u] }
              );
            a += this.renderer.tablerow(l);
            let c = "";
            for (let u = 0; u < s.rows.length; u++) {
              let d = s.rows[u];
              l = "";
              for (let f = 0; f < d.length; f++)
                l += this.renderer.tablecell(this.parseInline(d[f].tokens), {
                  header: !1,
                  align: s.align[f],
                });
              c += this.renderer.tablerow(l);
            }
            n += this.renderer.table(a, c);
            continue;
          }
          case "blockquote": {
            let s = o,
              a = this.parse(s.tokens);
            n += this.renderer.blockquote(a);
            continue;
          }
          case "list": {
            let s = o,
              a = s.ordered,
              l = s.start,
              c = s.loose,
              u = "";
            for (let d = 0; d < s.items.length; d++) {
              let f = s.items[d],
                g = f.checked,
                C = f.task,
                I = "";
              if (f.task) {
                let x = this.renderer.checkbox(!!g);
                c
                  ? f.tokens.length > 0 && f.tokens[0].type === "paragraph"
                    ? ((f.tokens[0].text = x + " " + f.tokens[0].text),
                      f.tokens[0].tokens &&
                        f.tokens[0].tokens.length > 0 &&
                        f.tokens[0].tokens[0].type === "text" &&
                        (f.tokens[0].tokens[0].text =
                          x + " " + f.tokens[0].tokens[0].text))
                    : f.tokens.unshift({ type: "text", text: x + " " })
                  : (I += x + " ");
              }
              (I += this.parse(f.tokens, c)),
                (u += this.renderer.listitem(I, C, !!g));
            }
            n += this.renderer.list(u, a, l);
            continue;
          }
          case "html": {
            let s = o;
            n += this.renderer.html(s.text, s.block);
            continue;
          }
          case "paragraph": {
            let s = o;
            n += this.renderer.paragraph(this.parseInline(s.tokens));
            continue;
          }
          case "text": {
            let s = o,
              a = s.tokens ? this.parseInline(s.tokens) : s.text;
            for (; i + 1 < e.length && e[i + 1].type === "text"; )
              (s = e[++i]),
                (a +=
                  `
` + (s.tokens ? this.parseInline(s.tokens) : s.text));
            n += r ? this.renderer.paragraph(a) : a;
            continue;
          }
          default: {
            let s = 'Token with "' + o.type + '" type was not found.';
            if (this.options.silent) return console.error(s), "";
            throw new Error(s);
          }
        }
      }
      return n;
    }
    parseInline(e, r) {
      r = r || this.renderer;
      let n = "";
      for (let i = 0; i < e.length; i++) {
        let o = e[i];
        if (
          this.options.extensions &&
          this.options.extensions.renderers &&
          this.options.extensions.renderers[o.type]
        ) {
          let s = this.options.extensions.renderers[o.type].call(
            { parser: this },
            o
          );
          if (
            s !== !1 ||
            ![
              "escape",
              "html",
              "link",
              "image",
              "strong",
              "em",
              "codespan",
              "br",
              "del",
              "text",
            ].includes(o.type)
          ) {
            n += s || "";
            continue;
          }
        }
        switch (o.type) {
          case "escape": {
            let s = o;
            n += r.text(s.text);
            break;
          }
          case "html": {
            let s = o;
            n += r.html(s.text);
            break;
          }
          case "link": {
            let s = o;
            n += r.link(s.href, s.title, this.parseInline(s.tokens, r));
            break;
          }
          case "image": {
            let s = o;
            n += r.image(s.href, s.title, s.text);
            break;
          }
          case "strong": {
            let s = o;
            n += r.strong(this.parseInline(s.tokens, r));
            break;
          }
          case "em": {
            let s = o;
            n += r.em(this.parseInline(s.tokens, r));
            break;
          }
          case "codespan": {
            let s = o;
            n += r.codespan(s.text);
            break;
          }
          case "br": {
            n += r.br();
            break;
          }
          case "del": {
            let s = o;
            n += r.del(this.parseInline(s.tokens, r));
            break;
          }
          case "text": {
            let s = o;
            n += r.text(s.text);
            break;
          }
          default: {
            let s = 'Token with "' + o.type + '" type was not found.';
            if (this.options.silent) return console.error(s), "";
            throw new Error(s);
          }
        }
      }
      return n;
    }
  },
  Di = class {
    options;
    constructor(e) {
      this.options = e || br;
    }
    static passThroughHooks = new Set([
      "preprocess",
      "postprocess",
      "processAllTokens",
    ]);
    preprocess(e) {
      return e;
    }
    postprocess(e) {
      return e;
    }
    processAllTokens(e) {
      return e;
    }
  },
  Hf = class {
    defaults = zf();
    options = this.setOptions;
    parse = this.#e(En.lex, In.parse);
    parseInline = this.#e(En.lexInline, In.parseInline);
    Parser = In;
    Renderer = on;
    TextRenderer = Fo;
    Lexer = En;
    Tokenizer = wi;
    Hooks = Di;
    constructor(...e) {
      this.use(...e);
    }
    walkTokens(e, r) {
      let n = [];
      for (let i of e)
        switch (((n = n.concat(r.call(this, i))), i.type)) {
          case "table": {
            let o = i;
            for (let s of o.header) n = n.concat(this.walkTokens(s.tokens, r));
            for (let s of o.rows)
              for (let a of s) n = n.concat(this.walkTokens(a.tokens, r));
            break;
          }
          case "list": {
            let o = i;
            n = n.concat(this.walkTokens(o.items, r));
            break;
          }
          default: {
            let o = i;
            this.defaults.extensions?.childTokens?.[o.type]
              ? this.defaults.extensions.childTokens[o.type].forEach((s) => {
                  let a = o[s].flat(1 / 0);
                  n = n.concat(this.walkTokens(a, r));
                })
              : o.tokens && (n = n.concat(this.walkTokens(o.tokens, r)));
          }
        }
      return n;
    }
    use(...e) {
      let r = this.defaults.extensions || { renderers: {}, childTokens: {} };
      return (
        e.forEach((n) => {
          let i = v({}, n);
          if (
            ((i.async = this.defaults.async || i.async || !1),
            n.extensions &&
              (n.extensions.forEach((o) => {
                if (!o.name) throw new Error("extension name required");
                if ("renderer" in o) {
                  let s = r.renderers[o.name];
                  s
                    ? (r.renderers[o.name] = function (...a) {
                        let l = o.renderer.apply(this, a);
                        return l === !1 && (l = s.apply(this, a)), l;
                      })
                    : (r.renderers[o.name] = o.renderer);
                }
                if ("tokenizer" in o) {
                  if (!o.level || (o.level !== "block" && o.level !== "inline"))
                    throw new Error(
                      "extension level must be 'block' or 'inline'"
                    );
                  let s = r[o.level];
                  s ? s.unshift(o.tokenizer) : (r[o.level] = [o.tokenizer]),
                    o.start &&
                      (o.level === "block"
                        ? r.startBlock
                          ? r.startBlock.push(o.start)
                          : (r.startBlock = [o.start])
                        : o.level === "inline" &&
                          (r.startInline
                            ? r.startInline.push(o.start)
                            : (r.startInline = [o.start])));
                }
                "childTokens" in o &&
                  o.childTokens &&
                  (r.childTokens[o.name] = o.childTokens);
              }),
              (i.extensions = r)),
            n.renderer)
          ) {
            let o = this.defaults.renderer || new on(this.defaults);
            for (let s in n.renderer) {
              if (!(s in o)) throw new Error(`renderer '${s}' does not exist`);
              if (s === "options") continue;
              let a = s,
                l = n.renderer[a],
                c = o[a];
              o[a] = (...u) => {
                let d = l.apply(o, u);
                return d === !1 && (d = c.apply(o, u)), d || "";
              };
            }
            i.renderer = o;
          }
          if (n.tokenizer) {
            let o = this.defaults.tokenizer || new wi(this.defaults);
            for (let s in n.tokenizer) {
              if (!(s in o)) throw new Error(`tokenizer '${s}' does not exist`);
              if (["options", "rules", "lexer"].includes(s)) continue;
              let a = s,
                l = n.tokenizer[a],
                c = o[a];
              o[a] = (...u) => {
                let d = l.apply(o, u);
                return d === !1 && (d = c.apply(o, u)), d;
              };
            }
            i.tokenizer = o;
          }
          if (n.hooks) {
            let o = this.defaults.hooks || new Di();
            for (let s in n.hooks) {
              if (!(s in o)) throw new Error(`hook '${s}' does not exist`);
              if (s === "options") continue;
              let a = s,
                l = n.hooks[a],
                c = o[a];
              Di.passThroughHooks.has(s)
                ? (o[a] = (u) => {
                    if (this.defaults.async)
                      return Promise.resolve(l.call(o, u)).then((f) =>
                        c.call(o, f)
                      );
                    let d = l.call(o, u);
                    return c.call(o, d);
                  })
                : (o[a] = (...u) => {
                    let d = l.apply(o, u);
                    return d === !1 && (d = c.apply(o, u)), d;
                  });
            }
            i.hooks = o;
          }
          if (n.walkTokens) {
            let o = this.defaults.walkTokens,
              s = n.walkTokens;
            i.walkTokens = function (a) {
              let l = [];
              return (
                l.push(s.call(this, a)), o && (l = l.concat(o.call(this, a))), l
              );
            };
          }
          this.defaults = v(v({}, this.defaults), i);
        }),
        this
      );
    }
    setOptions(e) {
      return (this.defaults = v(v({}, this.defaults), e)), this;
    }
    lexer(e, r) {
      return En.lex(e, r ?? this.defaults);
    }
    parser(e, r) {
      return In.parse(e, r ?? this.defaults);
    }
    #e(e, r) {
      return (n, i) => {
        let o = v({}, i),
          s = v(v({}, this.defaults), o);
        this.defaults.async === !0 &&
          o.async === !1 &&
          (s.silent ||
            console.warn(
              "marked(): The async option was set to true by an extension. The async: false option sent to parse will be ignored."
            ),
          (s.async = !0));
        let a = this.#t(!!s.silent, !!s.async);
        if (typeof n > "u" || n === null)
          return a(new Error("marked(): input parameter is undefined or null"));
        if (typeof n != "string")
          return a(
            new Error(
              "marked(): input parameter is of type " +
                Object.prototype.toString.call(n) +
                ", string expected"
            )
          );
        if ((s.hooks && (s.hooks.options = s), s.async))
          return Promise.resolve(s.hooks ? s.hooks.preprocess(n) : n)
            .then((l) => e(l, s))
            .then((l) => (s.hooks ? s.hooks.processAllTokens(l) : l))
            .then((l) =>
              s.walkTokens
                ? Promise.all(this.walkTokens(l, s.walkTokens)).then(() => l)
                : l
            )
            .then((l) => r(l, s))
            .then((l) => (s.hooks ? s.hooks.postprocess(l) : l))
            .catch(a);
        try {
          s.hooks && (n = s.hooks.preprocess(n));
          let l = e(n, s);
          s.hooks && (l = s.hooks.processAllTokens(l)),
            s.walkTokens && this.walkTokens(l, s.walkTokens);
          let c = r(l, s);
          return s.hooks && (c = s.hooks.postprocess(c)), c;
        } catch (l) {
          return a(l);
        }
      };
    }
    #t(e, r) {
      return (n) => {
        if (
          ((n.message += `
Please report this to https://github.com/markedjs/marked.`),
          e)
        ) {
          let i =
            "<p>An error occurred:</p><pre>" +
            gt(n.message + "", !0) +
            "</pre>";
          return r ? Promise.resolve(i) : i;
        }
        if (r) return Promise.reject(n);
        throw n;
      };
    }
  },
  wr = new Hf();
function q(t, e) {
  return wr.parse(t, e);
}
q.options = q.setOptions = function (t) {
  return wr.setOptions(t), (q.defaults = wr.defaults), Jv(q.defaults), q;
};
q.getDefaults = zf;
q.defaults = br;
q.use = function (...t) {
  return wr.use(...t), (q.defaults = wr.defaults), Jv(q.defaults), q;
};
q.walkTokens = function (t, e) {
  return wr.walkTokens(t, e);
};
q.parseInline = wr.parseInline;
q.Parser = In;
q.parser = In.parse;
q.Renderer = on;
q.TextRenderer = Fo;
q.Lexer = En;
q.lexer = En.lex;
q.Tokenizer = wi;
q.Hooks = Di;
q.parse = q;
var dV = q.options,
  fV = q.setOptions,
  hV = q.use,
  pV = q.walkTokens,
  gV = q.parseInline;
var mV = In.parse,
  yV = En.lex;
var GT = ["*"],
  qT = "Copy",
  ZT = "Copied",
  QT = (() => {
    let e = class e {
      constructor() {
        (this._buttonClick$ = new me()),
          (this.copied$ = this._buttonClick$.pipe(
            Be(() => nc(A(!0), tc(3e3).pipe(Mi(!1)))),
            rc(),
            ac(1)
          )),
          (this.copiedText$ = this.copied$.pipe(
            xi(!1),
            k((n) => (n ? ZT : qT))
          ));
      }
      onCopyToClipboardClick() {
        this._buttonClick$.next();
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵcmp = te({
        type: e,
        selectors: [["markdown-clipboard"]],
        standalone: !0,
        features: [Qi],
        decls: 4,
        vars: 7,
        consts: [[1, "markdown-clipboard-button", 3, "click"]],
        template: function (i, o) {
          i & 1 &&
            (p(0, "button", 0),
            Me(1, "async"),
            z("click", function () {
              return o.onCopyToClipboardClick();
            }),
            m(2),
            Me(3, "async"),
            h()),
            i & 2 &&
              (Xr("copied", je(1, 3, o.copied$)),
              y(2),
              re(je(3, 5, o.copiedText$)));
        },
        dependencies: [ze],
        encapsulation: 2,
        changeDetection: 0,
      }));
    let t = e;
    return t;
  })(),
  YT = new S("CLIPBOARD_OPTIONS");
var Yf = (function (t) {
    return (
      (t.CommandLine = "command-line"),
      (t.LineHighlight = "line-highlight"),
      (t.LineNumbers = "line-numbers"),
      t
    );
  })(Yf || {}),
  u0 = new S("MARKED_EXTENSIONS"),
  KT = new S("MARKED_OPTIONS"),
  XT =
    "[ngx-markdown] When using the `emoji` attribute you *have to* include Emoji-Toolkit files to `angular.json` or use imports. See README for more information",
  JT =
    "[ngx-markdown] When using the `katex` attribute you *have to* include KaTeX files to `angular.json` or use imports. See README for more information",
  eA =
    "[ngx-markdown] When using the `mermaid` attribute you *have to* include Mermaid files to `angular.json` or use imports. See README for more information",
  tA =
    "[ngx-markdown] When using the `clipboard` attribute you *have to* include Clipboard files to `angular.json` or use imports. See README for more information",
  nA =
    "[ngx-markdown] When using the `clipboard` attribute you *have to* provide the `viewContainerRef` parameter to `MarkdownService.render()` function",
  rA =
    "[ngx-markdown] When using the `src` attribute you *have to* pass the `HttpClient` as a parameter of the `forRoot` method. See README for more information",
  d0 = new S("SECURITY_CONTEXT");
var f0 = (() => {
    let e = class e {
      get options() {
        return this._options;
      }
      set options(n) {
        this._options = v(v({}, this.DEFAULT_MARKED_OPTIONS), n);
      }
      get renderer() {
        return this.options.renderer;
      }
      set renderer(n) {
        this.options.renderer = n;
      }
      constructor(n, i, o, s, a, l, c) {
        (this.clipboardOptions = n),
          (this.extensions = i),
          (this.platform = s),
          (this.securityContext = a),
          (this.http = l),
          (this.sanitizer = c),
          (this.DEFAULT_MARKED_OPTIONS = { renderer: new on() }),
          (this.DEFAULT_KATEX_OPTIONS = {
            delimiters: [
              { left: "$$", right: "$$", display: !0 },
              { left: "$", right: "$", display: !1 },
              { left: "\\(", right: "\\)", display: !1 },
              {
                left: "\\begin{equation}",
                right: "\\end{equation}",
                display: !0,
              },
              { left: "\\begin{align}", right: "\\end{align}", display: !0 },
              {
                left: "\\begin{alignat}",
                right: "\\end{alignat}",
                display: !0,
              },
              { left: "\\begin{gather}", right: "\\end{gather}", display: !0 },
              { left: "\\begin{CD}", right: "\\end{CD}", display: !0 },
              { left: "\\[", right: "\\]", display: !0 },
            ],
          }),
          (this.DEFAULT_MERMAID_OPTIONS = { startOnLoad: !1 }),
          (this.DEFAULT_CLIPBOARD_OPTIONS = { buttonComponent: void 0 }),
          (this.DEFAULT_PARSE_OPTIONS = {
            decodeHtml: !1,
            inline: !1,
            emoji: !1,
            mermaid: !1,
            markedOptions: void 0,
            disableSanitizer: !1,
          }),
          (this.DEFAULT_RENDER_OPTIONS = {
            clipboard: !1,
            clipboardOptions: void 0,
            katex: !1,
            katexOptions: void 0,
            mermaid: !1,
            mermaidOptions: void 0,
          }),
          (this._reload$ = new me()),
          (this.reload$ = this._reload$.asObservable()),
          (this.options = o);
      }
      parse(n, i = this.DEFAULT_PARSE_OPTIONS) {
        let {
            decodeHtml: o,
            inline: s,
            emoji: a,
            mermaid: l,
            disableSanitizer: c,
          } = i,
          u = v(v({}, this.options), i.markedOptions),
          d = u.renderer || this.renderer || new on();
        this.extensions &&
          (this.renderer = this.extendsRendererForExtensions(d)),
          l && (this.renderer = this.extendsRendererForMermaid(d));
        let f = this.trimIndentation(n),
          g = o ? this.decodeHtml(f) : f,
          C = a ? this.parseEmoji(g) : g,
          I = this.parseMarked(C, u, s);
        return (c ? I : this.sanitizer.sanitize(this.securityContext, I)) || "";
      }
      render(n, i = this.DEFAULT_RENDER_OPTIONS, o) {
        let {
          clipboard: s,
          clipboardOptions: a,
          katex: l,
          katexOptions: c,
          mermaid: u,
          mermaidOptions: d,
        } = i;
        l && this.renderKatex(n, v(v({}, this.DEFAULT_KATEX_OPTIONS), c)),
          u && this.renderMermaid(n, v(v({}, this.DEFAULT_MERMAID_OPTIONS), d)),
          s &&
            this.renderClipboard(
              n,
              o,
              v(
                v(v({}, this.DEFAULT_CLIPBOARD_OPTIONS), this.clipboardOptions),
                a
              )
            ),
          this.highlight(n);
      }
      reload() {
        this._reload$.next();
      }
      getSource(n) {
        if (!this.http) throw new Error(rA);
        return this.http
          .get(n, { responseType: "text" })
          .pipe(k((i) => this.handleExtension(n, i)));
      }
      highlight(n) {
        if (
          !Kt(this.platform) ||
          typeof Prism > "u" ||
          typeof Prism.highlightAllUnder > "u"
        )
          return;
        n || (n = document);
        let i = n.querySelectorAll('pre code:not([class*="language-"])');
        Array.prototype.forEach.call(i, (o) =>
          o.classList.add("language-none")
        ),
          Prism.highlightAllUnder(n);
      }
      decodeHtml(n) {
        if (!Kt(this.platform)) return n;
        let i = document.createElement("textarea");
        return (i.innerHTML = n), i.value;
      }
      extendsRendererForExtensions(n) {
        let i = n;
        return (
          i.ɵNgxMarkdownRendererExtendedForExtensions === !0 ||
            (this.extensions?.length > 0 && q.use(...this.extensions),
            (i.ɵNgxMarkdownRendererExtendedForExtensions = !0)),
          n
        );
      }
      extendsRendererForMermaid(n) {
        let i = n;
        if (i.ɵNgxMarkdownRendererExtendedForMermaid === !0) return n;
        let o = n.code;
        return (
          (n.code = function (s, a, l) {
            return a === "mermaid"
              ? `<div class="mermaid">${s}</div>`
              : o.call(this, s, a, l);
          }),
          (i.ɵNgxMarkdownRendererExtendedForMermaid = !0),
          n
        );
      }
      handleExtension(n, i) {
        let o = n.lastIndexOf("://"),
          s = o > -1 ? n.substring(o + 4) : n,
          a = s.lastIndexOf("/"),
          l = a > -1 ? s.substring(a + 1).split("?")[0] : "",
          c = l.lastIndexOf("."),
          u = c > -1 ? l.substring(c + 1) : "";
        return u && u !== "md"
          ? "```" +
              u +
              `
` +
              i +
              "\n```"
          : i;
      }
      parseMarked(n, i, o = !1) {
        if (i.renderer) {
          let s = v({}, i.renderer);
          delete s.ɵNgxMarkdownRendererExtendedForExtensions,
            delete s.ɵNgxMarkdownRendererExtendedForMermaid,
            delete i.renderer,
            q.use({ renderer: s });
        }
        return o ? q.parseInline(n, i) : q.parse(n, i);
      }
      parseEmoji(n) {
        if (!Kt(this.platform)) return n;
        if (typeof joypixels > "u" || typeof joypixels.shortnameToUnicode > "u")
          throw new Error(XT);
        return joypixels.shortnameToUnicode(n);
      }
      renderKatex(n, i) {
        if (Kt(this.platform)) {
          if (typeof katex > "u" || typeof renderMathInElement > "u")
            throw new Error(JT);
          renderMathInElement(n, i);
        }
      }
      renderClipboard(n, i, o) {
        if (!Kt(this.platform)) return;
        if (typeof ClipboardJS > "u") throw new Error(tA);
        if (!i) throw new Error(nA);
        let { buttonComponent: s, buttonTemplate: a } = o,
          l = n.querySelectorAll("pre");
        for (let c = 0; c < l.length; c++) {
          let u = l.item(c),
            d = document.createElement("div");
          (d.style.position = "relative"),
            u.parentNode.insertBefore(d, u),
            d.appendChild(u);
          let f = document.createElement("div");
          (f.style.position = "absolute"),
            (f.style.top = ".5em"),
            (f.style.right = ".5em"),
            (f.style.opacity = "0"),
            (f.style.transition = "opacity 250ms ease-out"),
            (f.style.zIndex = "1"),
            d.insertAdjacentElement("beforeend", f),
            (u.onmouseover = () => (f.style.opacity = "1")),
            (u.onmouseout = () => (f.style.opacity = "0"));
          let g;
          if (s) {
            let I = i.createComponent(s);
            (g = I.hostView), I.changeDetectorRef.markForCheck();
          } else if (a) g = i.createEmbeddedView(a);
          else {
            let I = i.createComponent(QT);
            (g = I.hostView), I.changeDetectorRef.markForCheck();
          }
          let C;
          g.rootNodes.forEach((I) => {
            (I.onmouseover = () => (f.style.opacity = "1")),
              f.appendChild(I),
              (C = new ClipboardJS(I, { text: () => u.innerText }));
          }),
            g.onDestroy(() => C.destroy());
        }
      }
      renderMermaid(n, i = this.DEFAULT_MERMAID_OPTIONS) {
        if (!Kt(this.platform)) return;
        if (typeof mermaid > "u" || typeof mermaid.initialize > "u")
          throw new Error(eA);
        let o = n.querySelectorAll(".mermaid");
        o.length !== 0 && (mermaid.initialize(i), mermaid.run({ nodes: o }));
      }
      trimIndentation(n) {
        if (!n) return "";
        let i;
        return n
          .split(
            `
`
          )
          .map((o) => {
            let s = i;
            return (
              o.length > 0 &&
                (s = isNaN(s)
                  ? o.search(/\S|$/)
                  : Math.min(o.search(/\S|$/), s)),
              isNaN(i) && (i = s),
              s ? o.substring(s) : o
            );
          }).join(`
`);
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(
        b(YT, 8),
        b(u0, 8),
        b(KT, 8),
        b(rt),
        b(d0),
        b(Vt, 8),
        b(qd)
      );
    }),
      (e.ɵprov = E({ token: e, factory: e.ɵfac }));
    let t = e;
    return t;
  })(),
  bi = (() => {
    let e = class e {
      get disableSanitizer() {
        return this._disableSanitizer;
      }
      set disableSanitizer(n) {
        this._disableSanitizer = this.coerceBooleanProperty(n);
      }
      get inline() {
        return this._inline;
      }
      set inline(n) {
        this._inline = this.coerceBooleanProperty(n);
      }
      get clipboard() {
        return this._clipboard;
      }
      set clipboard(n) {
        this._clipboard = this.coerceBooleanProperty(n);
      }
      get emoji() {
        return this._emoji;
      }
      set emoji(n) {
        this._emoji = this.coerceBooleanProperty(n);
      }
      get katex() {
        return this._katex;
      }
      set katex(n) {
        this._katex = this.coerceBooleanProperty(n);
      }
      get mermaid() {
        return this._mermaid;
      }
      set mermaid(n) {
        this._mermaid = this.coerceBooleanProperty(n);
      }
      get lineHighlight() {
        return this._lineHighlight;
      }
      set lineHighlight(n) {
        this._lineHighlight = this.coerceBooleanProperty(n);
      }
      get lineNumbers() {
        return this._lineNumbers;
      }
      set lineNumbers(n) {
        this._lineNumbers = this.coerceBooleanProperty(n);
      }
      get commandLine() {
        return this._commandLine;
      }
      set commandLine(n) {
        this._commandLine = this.coerceBooleanProperty(n);
      }
      constructor(n, i, o) {
        (this.element = n),
          (this.markdownService = i),
          (this.viewContainerRef = o),
          (this.error = new pe()),
          (this.load = new pe()),
          (this.ready = new pe()),
          (this._clipboard = !1),
          (this._commandLine = !1),
          (this._disableSanitizer = !1),
          (this._emoji = !1),
          (this._inline = !1),
          (this._katex = !1),
          (this._lineHighlight = !1),
          (this._lineNumbers = !1),
          (this._mermaid = !1),
          (this.destroyed$ = new me());
      }
      ngOnChanges() {
        this.loadContent();
      }
      loadContent() {
        if (this.data != null) {
          this.handleData();
          return;
        }
        if (this.src != null) {
          this.handleSrc();
          return;
        }
      }
      ngAfterViewInit() {
        !this.data && !this.src && this.handleTransclusion(),
          this.markdownService.reload$
            .pipe(Ti(this.destroyed$))
            .subscribe(() => this.loadContent());
      }
      ngOnDestroy() {
        this.destroyed$.next(), this.destroyed$.complete();
      }
      render(n, i = !1) {
        return jo(this, null, function* () {
          let o = {
              decodeHtml: i,
              inline: this.inline,
              emoji: this.emoji,
              mermaid: this.mermaid,
              disableSanitizer: this.disableSanitizer,
            },
            s = {
              clipboard: this.clipboard,
              clipboardOptions: {
                buttonComponent: this.clipboardButtonComponent,
                buttonTemplate: this.clipboardButtonTemplate,
              },
              katex: this.katex,
              katexOptions: this.katexOptions,
              mermaid: this.mermaid,
              mermaidOptions: this.mermaidOptions,
            },
            a = yield this.markdownService.parse(n, o);
          (this.element.nativeElement.innerHTML = a),
            this.handlePlugins(),
            this.markdownService.render(
              this.element.nativeElement,
              s,
              this.viewContainerRef
            ),
            this.ready.emit();
        });
      }
      coerceBooleanProperty(n) {
        return n != null && `${String(n)}` != "false";
      }
      handleData() {
        this.render(this.data);
      }
      handleSrc() {
        this.markdownService.getSource(this.src).subscribe({
          next: (n) => {
            this.render(n).then(() => {
              this.load.emit(n);
            });
          },
          error: (n) => this.error.emit(n),
        });
      }
      handleTransclusion() {
        this.render(this.element.nativeElement.innerHTML, !0);
      }
      handlePlugins() {
        this.commandLine &&
          (this.setPluginClass(this.element.nativeElement, Yf.CommandLine),
          this.setPluginOptions(this.element.nativeElement, {
            dataFilterOutput: this.filterOutput,
            dataHost: this.host,
            dataPrompt: this.prompt,
            dataOutput: this.output,
            dataUser: this.user,
          })),
          this.lineHighlight &&
            this.setPluginOptions(this.element.nativeElement, {
              dataLine: this.line,
              dataLineOffset: this.lineOffset,
            }),
          this.lineNumbers &&
            (this.setPluginClass(this.element.nativeElement, Yf.LineNumbers),
            this.setPluginOptions(this.element.nativeElement, {
              dataStart: this.start,
            }));
      }
      setPluginClass(n, i) {
        let o = n.querySelectorAll("pre");
        for (let s = 0; s < o.length; s++) {
          let a = i instanceof Array ? i : [i];
          o.item(s).classList.add(...a);
        }
      }
      setPluginOptions(n, i) {
        let o = n.querySelectorAll("pre");
        for (let s = 0; s < o.length; s++)
          Object.keys(i).forEach((a) => {
            let l = i[a];
            if (l) {
              let c = this.toLispCase(a);
              o.item(s).setAttribute(c, l.toString());
            }
          });
      }
      toLispCase(n) {
        let i = n.match(/([A-Z])/g);
        if (!i) return n;
        let o = n.toString();
        for (let s = 0, a = i.length; s < a; s++)
          o = o.replace(new RegExp(i[s]), "-" + i[s].toLowerCase());
        return o.slice(0, 1) === "-" && (o = o.slice(1)), o;
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)(w($e), w(f0), w(Zt));
    }),
      (e.ɵcmp = te({
        type: e,
        selectors: [["markdown"], ["", "markdown", ""]],
        inputs: {
          data: "data",
          src: "src",
          disableSanitizer: "disableSanitizer",
          inline: "inline",
          clipboard: "clipboard",
          clipboardButtonComponent: "clipboardButtonComponent",
          clipboardButtonTemplate: "clipboardButtonTemplate",
          emoji: "emoji",
          katex: "katex",
          katexOptions: "katexOptions",
          mermaid: "mermaid",
          mermaidOptions: "mermaidOptions",
          lineHighlight: "lineHighlight",
          line: "line",
          lineOffset: "lineOffset",
          lineNumbers: "lineNumbers",
          start: "start",
          commandLine: "commandLine",
          filterOutput: "filterOutput",
          host: "host",
          prompt: "prompt",
          output: "output",
          user: "user",
        },
        outputs: { error: "error", load: "load", ready: "ready" },
        standalone: !0,
        features: [mn, Qi],
        ngContentSelectors: GT,
        decls: 1,
        vars: 0,
        template: function (i, o) {
          i & 1 && (Nm(), Rm(0));
        },
        encapsulation: 2,
      }));
    let t = e;
    return t;
  })();
function iA(t) {
  return [
    f0,
    t?.loader ?? [],
    t?.clipboardOptions ?? [],
    t?.markedOptions ?? [],
    { provide: u0, useValue: t?.markedExtensions ?? [] },
    { provide: d0, useValue: t?.sanitize ?? vt.HTML },
  ];
}
var h0 = (() => {
    let e = class e {
      static forRoot(n) {
        return { ngModule: e, providers: [iA(n)] };
      }
      static forChild() {
        return { ngModule: e };
      }
    };
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵmod = Re({ type: e })),
      (e.ɵinj = Ne({ imports: [Ga] }));
    let t = e;
    return t;
  })(),
  c0;
(function (t) {
  let e;
  (function (i) {
    (i.Strict = "strict"),
      (i.Loose = "loose"),
      (i.Antiscript = "antiscript"),
      (i.Sandbox = "sandbox");
  })((e = t.SecurityLevel || (t.SecurityLevel = {})));
  let r;
  (function (i) {
    (i.Base = "base"),
      (i.Forest = "forest"),
      (i.Dark = "dark"),
      (i.Default = "default"),
      (i.Neutral = "neutral");
  })((r = t.Theme || (t.Theme = {})));
  let n;
  (function (i) {
    (i[(i.Debug = 1)] = "Debug"),
      (i[(i.Info = 2)] = "Info"),
      (i[(i.Warn = 3)] = "Warn"),
      (i[(i.Error = 4)] = "Error"),
      (i[(i.Fatal = 5)] = "Fatal");
  })((n = t.LogLevel || (t.LogLevel = {})));
})(c0 || (c0 = {}));
var oA = ["form"];
function sA(t, e) {
  if (t & 1) {
    let r = Ve();
    p(0, "div", 17),
      z("click", function () {
        let i = R(r).$implicit,
          o = ce(2);
        return O(o.selectImage(i));
      }),
      ne(1, "img", 18),
      p(2, "span", 19),
      m(3),
      h()();
  }
  if (t & 2) {
    let r = e.$implicit;
    y(), T("src", r.url, kt)("title", r.title), y(2), re(r.title);
  }
}
function aA(t, e) {
  if (
    (t & 1 && (Ue(0), p(1, "div", 15), G(2, sA, 4, 3, "div", 16), h(), He()),
    t & 2)
  ) {
    let r = e.ngIf;
    y(2), T("ngForOf", r);
  }
}
var Fl = (() => {
  let e = class e {
    constructor(n) {
      (this.imageService = n), (this.fileName = ""), (this.title = "");
    }
    ngOnInit() {
      this.getImages();
    }
    onFileUploadChange(n) {
      let i = n.currentTarget;
      this.file = i.files?.[0];
    }
    uploadImage() {
      this.file &&
        this.fileName !== "" &&
        this.title !== "" &&
        (this.uploadImageSubscription = this.imageService
          .uploadImage(this.file, this.fileName, this.title)
          .subscribe({
            next: (n) => {
              this.getImages(), this.imageUploadForm?.resetForm();
            },
          }));
    }
    selectImage(n) {
      this.imageService.selectImage(n);
    }
    getImages() {
      this.images$ = this.imageService.getAllImages();
    }
    ngOnDestroy() {
      this.uploadImageSubscription?.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(vi));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-image-selector"]],
      viewQuery: function (i, o) {
        if ((i & 1 && km(oA, 5), i & 2)) {
          let s;
          ud((s = dd())) && (o.imageUploadForm = s.first);
        }
      },
      decls: 22,
      vars: 5,
      consts: [
        ["form", "ngForm"],
        [1, "card", "h-100"],
        [1, "card-header"],
        [1, "card-title"],
        [1, "card-body"],
        [1, "d-flex", "flex-md-row", "flex-sm-column", "flex-wrap"],
        [1, "col-8", "p-4", 2, "overflow-y", "scroll"],
        [4, "ngIf"],
        [1, "col-4", "p-4", "bg-light"],
        [3, "ngSubmit"],
        [1, "mt-3"],
        ["type", "file", 1, "form-control", 3, "change"],
        [
          "type",
          "text",
          "placeholder",
          "File Name",
          "name",
          "file-name",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "text",
          "placeholder",
          "Title",
          "name",
          "title",
          1,
          "form-control",
          "mt-3",
          3,
          "ngModelChange",
          "ngModel",
        ],
        ["type", "submit", 1, "btn", "btn-dark"],
        [1, "d-flex", "flex-wrap"],
        [
          "style",
          "min-width: 100px; justify-content: center; cursor: pointer",
          "class",
          "me-1 bg-white d-flex align-items-center flex-column border p-3",
          3,
          "click",
          4,
          "ngFor",
          "ngForOf",
        ],
        [
          1,
          "me-1",
          "bg-white",
          "d-flex",
          "align-items-center",
          "flex-column",
          "border",
          "p-3",
          2,
          "min-width",
          "100px",
          "justify-content",
          "center",
          "cursor",
          "pointer",
          3,
          "click",
        ],
        [2, "height", "100px", 3, "src", "title"],
        [1, "mt-1"],
      ],
      template: function (i, o) {
        if (i & 1) {
          let s = Ve();
          p(0, "div", 1)(1, "div", 2)(2, "h3", 3),
            m(3, "Images"),
            h()(),
            p(4, "div", 4)(5, "div", 5)(6, "div", 6),
            G(7, aA, 3, 1, "ng-container", 7),
            Me(8, "async"),
            h(),
            p(9, "div", 8)(10, "h5"),
            m(11, "Upload Image"),
            h(),
            p(12, "form", 9, 0),
            z("ngSubmit", function () {
              return R(s), O(o.uploadImage());
            }),
            p(14, "div", 10)(15, "input", 11),
            z("change", function (l) {
              return R(s), O(o.onFileUploadChange(l));
            }),
            h()(),
            p(16, "div", 10)(17, "input", 12),
            Y("ngModelChange", function (l) {
              return R(s), J(o.fileName, l) || (o.fileName = l), O(l);
            }),
            h(),
            p(18, "input", 13),
            Y("ngModelChange", function (l) {
              return R(s), J(o.title, l) || (o.title = l), O(l);
            }),
            h()(),
            p(19, "div", 10)(20, "button", 14),
            m(21, "Upload"),
            h()()()()()()();
        }
        i & 2 &&
          (y(7),
          T("ngIf", je(8, 3, o.images$)),
          y(10),
          Q("ngModel", o.fileName),
          y(),
          Q("ngModel", o.title));
      },
      dependencies: [it, Oe, It, ot, Ct, Et, pt, ht, ze],
    }));
  let t = e;
  return t;
})();
var lA = (t, e) => ({ "d-block": t, "d-none": e });
function cA(t, e) {
  if ((t & 1 && (Ue(0), p(1, "div"), ne(2, "img", 25), h(), He()), t & 2)) {
    let r = ce();
    y(2), T("src", r.model.featuredImageUrl, kt);
  }
}
function uA(t, e) {
  if ((t & 1 && (p(0, "option", 28), m(1), h()), t & 2)) {
    let r = e.$implicit;
    T("value", r.id), y(), Qt(" ", r.name, " ");
  }
}
function dA(t, e) {
  if (t & 1) {
    let r = Ve();
    Ue(0),
      p(1, "select", 26),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return J(o.model.categories, i) || (o.model.categories = i), O(i);
      }),
      G(2, uA, 2, 2, "option", 27),
      h(),
      He();
  }
  if (t & 2) {
    let r = e.ngIf,
      n = ce();
    y(), Q("ngModel", n.model.categories), y(), T("ngForOf", r);
  }
}
var g0 = (() => {
  let e = class e {
    constructor(n, i, o, s) {
      (this.blogPostService = n),
        (this.router = i),
        (this.categoryService = o),
        (this.imageService = s),
        (this.isImageOpen = !1),
        (this.model = {
          title: "",
          urlHnadle: "",
          shortDescription: "",
          content: "",
          featuredImageUrl: "",
          publishedDate: new Date(),
          author: "",
          isVisible: !0,
          categories: [],
        });
    }
    ngOnInit() {
      (this.categories$ = this.categoryService.getAllCategories()),
        (this.imageSelectorSubscription = this.imageService
          .onSelectImage()
          .subscribe({
            next: (n) => {
              this.model &&
                ((this.model.featuredImageUrl = n.url),
                (this.isImageOpen = !1));
            },
          }));
    }
    onSubmit() {
      this.createBlogPostSubscription = this.blogPostService
        .createBlogPost(this.model)
        .subscribe({
          next: (n) => {
            this.router.navigate(["/admin/blogposts"]);
          },
        });
    }
    openImageSelector() {
      this.isImageOpen = !0;
    }
    closeImageSelector() {
      this.isImageOpen = !1;
    }
    ngOnDestroy() {
      this.createBlogPostSubscription &&
        this.createBlogPostSubscription.unsubscribe(),
        this.imageSelectorSubscription?.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(rn), w(ve), w(nn), w(vi));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-add-blog-post"]],
      decls: 58,
      vars: 21,
      consts: [
        ["form", "ngForm"],
        [1, "container"],
        [1, "mt-3"],
        [3, "ngSubmit"],
        [1, "mt-2", "mb-5"],
        [1, "form-label"],
        [
          "type",
          "text",
          "id",
          "title",
          "name",
          "title",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "text",
          "id",
          "urlHnadle",
          "name",
          "urlHnadle",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "text",
          "id",
          "shortDescription",
          "name",
          "shortDescription",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "d-flex", "flex-row"],
        [1, "col-6", "p-2"],
        [
          "name",
          "content",
          "id",
          "content",
          1,
          "form-control",
          2,
          "height",
          "350px",
          "max-height",
          "350px",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "col-6", "p-2", 2, "max-height", "350px", "overflow-y", "scroll"],
        [3, "data"],
        ["type", "button", 1, "btn", "btn-light", "ms-3", 3, "click"],
        [4, "ngIf"],
        [
          "type",
          "text",
          "id",
          "featuredImageUrl",
          "name",
          "featuredImageUrl",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "date",
          "id",
          "publishedDate",
          "name",
          "publishedDate",
          1,
          "form-control",
          3,
          "ngModelChange",
          "value",
          "ngModel",
        ],
        [
          "type",
          "text",
          "id",
          "author",
          "name",
          "author",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "form-check", "mt-3"],
        [
          "type",
          "checkbox",
          "id",
          "isVisible",
          "name",
          "isVisible",
          1,
          "form-check-input",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "form-check-label"],
        ["type", "submit", 1, "btn", "btn-primary"],
        [1, "images-container-model", 3, "ngClass"],
        [
          "type",
          "button",
          1,
          "btn",
          2,
          "position",
          "fixed",
          "top",
          "60px",
          "right",
          "60px",
          "z-index",
          "101",
          3,
          "click",
        ],
        [1, "my-3", 2, "height", "200px", 3, "src"],
        [
          "name",
          "categories",
          "id",
          "categories",
          "multiple",
          "",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [3, "value", 4, "ngFor", "ngForOf"],
        [3, "value"],
      ],
      template: function (i, o) {
        if (i & 1) {
          let s = Ve();
          p(0, "div", 1)(1, "h1", 2),
            m(2, "Add BlogPost"),
            h(),
            p(3, "form", 3, 0),
            z("ngSubmit", function () {
              return R(s), O(o.onSubmit());
            }),
            p(5, "div", 4)(6, "div", 2)(7, "label", 5),
            m(8, "Title"),
            h(),
            p(9, "input", 6),
            Y("ngModelChange", function (l) {
              return R(s), J(o.model.title, l) || (o.model.title = l), O(l);
            }),
            h()(),
            p(10, "div", 2)(11, "label", 5),
            m(12, "UrlHandle"),
            h(),
            p(13, "input", 7),
            Y("ngModelChange", function (l) {
              return (
                R(s), J(o.model.urlHnadle, l) || (o.model.urlHnadle = l), O(l)
              );
            }),
            h()(),
            p(14, "div", 2)(15, "label", 5),
            m(16, "Short Description"),
            h(),
            p(17, "input", 8),
            Y("ngModelChange", function (l) {
              return (
                R(s),
                J(o.model.shortDescription, l) ||
                  (o.model.shortDescription = l),
                O(l)
              );
            }),
            h()(),
            p(18, "div", 2)(19, "label", 5),
            m(20, "Content"),
            h(),
            p(21, "div", 9)(22, "div", 10)(23, "textarea", 11),
            Y("ngModelChange", function (l) {
              return R(s), J(o.model.content, l) || (o.model.content = l), O(l);
            }),
            h()(),
            p(24, "div", 12),
            ne(25, "markdown", 13),
            h()()(),
            p(26, "div", 2)(27, "label", 5),
            m(28, "Featured Image Url"),
            h(),
            p(29, "button", 14),
            z("click", function () {
              return R(s), O(o.openImageSelector());
            }),
            m(30, " Upload Image "),
            h(),
            G(31, cA, 3, 1, "ng-container", 15),
            p(32, "input", 16),
            Y("ngModelChange", function (l) {
              return (
                R(s),
                J(o.model.featuredImageUrl, l) ||
                  (o.model.featuredImageUrl = l),
                O(l)
              );
            }),
            h()(),
            p(33, "div", 2)(34, "label", 5),
            m(35, "Published Date"),
            h(),
            p(36, "input", 17),
            Me(37, "date"),
            z("ngModelChange", function (l) {
              return R(s), O((o.model.publishedDate = l));
            }),
            h()(),
            p(38, "div", 2)(39, "label", 5),
            m(40, "Author"),
            h(),
            p(41, "input", 18),
            Y("ngModelChange", function (l) {
              return R(s), J(o.model.author, l) || (o.model.author = l), O(l);
            }),
            h()(),
            p(42, "div", 19)(43, "input", 20),
            Y("ngModelChange", function (l) {
              return (
                R(s), J(o.model.isVisible, l) || (o.model.isVisible = l), O(l)
              );
            }),
            h(),
            p(44, "label", 21),
            m(45, " Is Visible? "),
            h()(),
            p(46, "div", 2)(47, "label", 5),
            m(48, "Categories"),
            h(),
            G(49, dA, 3, 2, "ng-container", 15),
            Me(50, "async"),
            h(),
            p(51, "div", 2)(52, "button", 22),
            m(53, "Save"),
            h()()()()(),
            p(54, "div", 23)(55, "button", 24),
            z("click", function () {
              return R(s), O(o.closeImageSelector());
            }),
            m(56, " X "),
            h(),
            ne(57, "app-image-selector"),
            h();
        }
        i & 2 &&
          (y(9),
          Q("ngModel", o.model.title),
          y(4),
          Q("ngModel", o.model.urlHnadle),
          y(4),
          Q("ngModel", o.model.shortDescription),
          y(6),
          Q("ngModel", o.model.content),
          y(2),
          T("data", o.model.content),
          y(6),
          T("ngIf", o.model.featuredImageUrl != ""),
          y(),
          Q("ngModel", o.model.featuredImageUrl),
          y(4),
          Zi("value", o.model.publishedDate),
          T("ngModel", ei(37, 13, o.model.publishedDate, "yyyy-MM-dd")),
          y(5),
          Q("ngModel", o.model.author),
          y(2),
          Q("ngModel", o.model.isVisible),
          y(6),
          T("ngIf", je(50, 16, o.categories$)),
          y(5),
          T("ngClass", Ia(18, lA, o.isImageOpen, !o.isImageOpen)));
      },
      dependencies: [
        Wa,
        it,
        Oe,
        It,
        Al,
        Nl,
        ot,
        Ro,
        mi,
        Ct,
        Et,
        pt,
        ht,
        bi,
        Fl,
        ze,
        ri,
      ],
    }));
  let t = e;
  return t;
})();
var fA = (t, e) => ({ "d-block": t, "d-none": e });
function hA(t, e) {
  if ((t & 1 && (Ue(0), p(1, "div"), ne(2, "img", 26), h(), He()), t & 2)) {
    let r = ce(2);
    y(2), T("src", r.model.featuredImageUrl, kt);
  }
}
function pA(t, e) {
  if ((t & 1 && (p(0, "option", 29), m(1), h()), t & 2)) {
    let r = e.$implicit;
    T("value", r.id), y(), Qt(" ", r.name, " ");
  }
}
function gA(t, e) {
  if (t & 1) {
    let r = Ve();
    Ue(0),
      p(1, "select", 27),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce(2);
        return J(o.selectedCategories, i) || (o.selectedCategories = i), O(i);
      }),
      G(2, pA, 2, 2, "option", 28),
      h(),
      He();
  }
  if (t & 2) {
    let r = e.ngIf,
      n = ce(2);
    y(), Q("ngModel", n.selectedCategories), y(), T("ngForOf", r);
  }
}
function mA(t, e) {
  if (t & 1) {
    let r = Ve();
    p(0, "div")(1, "form", 6, 0),
      z("ngSubmit", function () {
        R(r);
        let i = ce();
        return O(i.onSubmit());
      }),
      p(3, "div", 7)(4, "div", 2)(5, "label", 8),
      m(6, "Title"),
      h(),
      p(7, "input", 9),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return J(o.model.title, i) || (o.model.title = i), O(i);
      }),
      h()(),
      p(8, "div", 2)(9, "label", 8),
      m(10, "UrlHandle"),
      h(),
      p(11, "input", 10),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return J(o.model.urlHnadle, i) || (o.model.urlHnadle = i), O(i);
      }),
      h()(),
      p(12, "div", 2)(13, "label", 8),
      m(14, "Short Description"),
      h(),
      p(15, "input", 11),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return (
          J(o.model.shortDescription, i) || (o.model.shortDescription = i), O(i)
        );
      }),
      h()(),
      p(16, "div", 2)(17, "label", 8),
      m(18, "Content"),
      h(),
      p(19, "div", 12)(20, "div", 13)(21, "textarea", 14),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return J(o.model.content, i) || (o.model.content = i), O(i);
      }),
      h()(),
      p(22, "div", 15),
      ne(23, "markdown", 16),
      h()()(),
      p(24, "div", 2)(25, "label", 8),
      m(26, "Featured Image Url"),
      h(),
      p(27, "button", 17),
      z("click", function () {
        R(r);
        let i = ce();
        return O(i.openImageSelector());
      }),
      m(28, " Upload Image "),
      h(),
      G(29, hA, 3, 1, "ng-container", 3),
      p(30, "input", 18),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return (
          J(o.model.featuredImageUrl, i) || (o.model.featuredImageUrl = i), O(i)
        );
      }),
      h()(),
      p(31, "div", 2)(32, "label", 8),
      m(33, "Published Date"),
      h(),
      p(34, "input", 19),
      Me(35, "date"),
      z("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return O((o.model.publishedDate = i));
      }),
      h()(),
      p(36, "div", 2)(37, "label", 8),
      m(38, "Author"),
      h(),
      p(39, "input", 20),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return J(o.model.author, i) || (o.model.author = i), O(i);
      }),
      h()(),
      p(40, "div", 21)(41, "input", 22),
      Y("ngModelChange", function (i) {
        R(r);
        let o = ce();
        return J(o.model.isVisible, i) || (o.model.isVisible = i), O(i);
      }),
      h(),
      p(42, "label", 23),
      m(43, " Is Visible? "),
      h()(),
      p(44, "div", 2)(45, "label", 8),
      m(46, "Categories"),
      h(),
      G(47, gA, 3, 2, "ng-container", 3),
      Me(48, "async"),
      h(),
      p(49, "div", 2)(50, "button", 24),
      m(51, "Save"),
      h(),
      m(52, " | "),
      p(53, "button", 25),
      z("click", function () {
        R(r);
        let i = ce();
        return O(i.DeleteBlogPost());
      }),
      m(54, " Delete "),
      h()()()()();
  }
  if (t & 2) {
    let r = ce();
    y(7),
      Q("ngModel", r.model.title),
      y(4),
      Q("ngModel", r.model.urlHnadle),
      y(4),
      Q("ngModel", r.model.shortDescription),
      y(6),
      Q("ngModel", r.model.content),
      y(2),
      T("data", r.model.content),
      y(6),
      T("ngIf", r.model.featuredImageUrl != ""),
      y(),
      Q("ngModel", r.model.featuredImageUrl),
      y(4),
      Zi("value", r.model.publishedDate),
      T("ngModel", ei(35, 12, r.model.publishedDate, "yyyy-MM-dd")),
      y(5),
      Q("ngModel", r.model.author),
      y(2),
      Q("ngModel", r.model.isVisible),
      y(6),
      T("ngIf", je(48, 15, r.categories$));
  }
}
var m0 = (() => {
  let e = class e {
    constructor(n, i, o, s, a) {
      (this.route = n),
        (this.blogPostService = i),
        (this.categoryService = o),
        (this.router = s),
        (this.imageService = a),
        (this.id = null),
        (this.isImageOpen = !1);
    }
    ngOnInit() {
      (this.categories$ = this.categoryService.getAllCategories()),
        (this.routeSubscription = this.route.paramMap.subscribe({
          next: (n) => {
            (this.id = n.get("id")),
              this.id &&
                (this.getBlogPostSub = this.blogPostService
                  .getById(this.id)
                  .subscribe({
                    next: (i) => {
                      (this.model = i),
                        (this.selectedCategories = i.categories.map(
                          (o) => o.id
                        ));
                    },
                  })),
              (this.imageSelectSub = this.imageService
                .onSelectImage()
                .subscribe({
                  next: (i) => {
                    this.model &&
                      ((this.model.featuredImageUrl = i.url),
                      (this.isImageOpen = !1));
                  },
                }));
          },
        }));
    }
    onSubmit() {
      if (this.id && this.model) {
        let n = {
          author: this.model.author,
          content: this.model.content,
          featuredImageUrl: this.model.featuredImageUrl,
          publishedDate: this.model.publishedDate,
          title: this.model.title,
          urlHnadle: this.model.urlHnadle,
          isVisible: this.model.isVisible,
          shortDescription: this.model.shortDescription,
          categories: this.selectedCategories ?? [],
        };
        this.updateBlogPostSub = this.blogPostService
          .updateBlogPostById(this.id, n)
          .subscribe({
            next: (i) => {
              this.router.navigate(["/admin/blogposts"]);
            },
          });
      }
    }
    DeleteBlogPost() {
      this.id &&
        (this.deleteBlogPostSub = this.blogPostService
          .deleteBlogPostById(this.id)
          .subscribe({
            next: (n) => {
              this.router.navigate(["/admin/blogposts"]);
            },
          }));
    }
    openImageSelector() {
      this.isImageOpen = !0;
    }
    closeImageSelector() {
      this.isImageOpen = !1;
    }
    ngOnDestroy() {
      this.routeSubscription && this.routeSubscription.unsubscribe(),
        this.updateBlogPostSub && this.updateBlogPostSub.unsubscribe(),
        this.getBlogPostSub && this.getBlogPostSub.unsubscribe(),
        this.deleteBlogPostSub?.unsubscribe(),
        this.imageSelectSub?.unsubscribe();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(ft), w(rn), w(nn), w(ve), w(vi));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-edit-blog-post"]],
      decls: 8,
      vars: 5,
      consts: [
        ["form", "ngForm"],
        [1, "container"],
        [1, "mt-3"],
        [4, "ngIf"],
        [1, "images-container-model", 3, "ngClass"],
        [
          "type",
          "button",
          1,
          "btn",
          2,
          "position",
          "fixed",
          "top",
          "60px",
          "right",
          "60px",
          "z-index",
          "101",
          3,
          "click",
        ],
        [3, "ngSubmit"],
        [1, "mt-2", "mb-5"],
        [1, "form-label"],
        [
          "type",
          "text",
          "id",
          "title",
          "name",
          "title",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "text",
          "id",
          "urlHnadle",
          "name",
          "urlHnadle",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "text",
          "id",
          "shortDescription",
          "name",
          "shortDescription",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "d-flex", "flex-row"],
        [1, "col-6", "p-2"],
        [
          "name",
          "content",
          "id",
          "content",
          1,
          "form-control",
          2,
          "height",
          "350px",
          "max-height",
          "350px",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "col-6", "p-2", 2, "max-height", "350px", "overflow-y", "scroll"],
        [3, "data"],
        ["type", "button", 1, "btn", "btn-light", "ms-3", 3, "click"],
        [
          "type",
          "text",
          "id",
          "featuredImageUrl",
          "name",
          "featuredImageUrl",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "date",
          "id",
          "publishedDate",
          "name",
          "publishedDate",
          1,
          "form-control",
          3,
          "ngModelChange",
          "value",
          "ngModel",
        ],
        [
          "type",
          "text",
          "id",
          "author",
          "name",
          "author",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "form-check", "mt-3"],
        [
          "type",
          "checkbox",
          "id",
          "isVisible",
          "name",
          "isVisible",
          1,
          "form-check-input",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [1, "form-check-label"],
        ["type", "submit", 1, "btn", "btn-primary"],
        ["type", "button", 1, "btn", "btn-danger", 3, "click"],
        [1, "my-3", 2, "height", "200px", 3, "src"],
        [
          "name",
          "categories",
          "id",
          "categories",
          "multiple",
          "",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [3, "value", 4, "ngFor", "ngForOf"],
        [3, "value"],
      ],
      template: function (i, o) {
        i & 1 &&
          (p(0, "div", 1)(1, "h1", 2),
          m(2, "Edit BlogPost"),
          h(),
          G(3, mA, 55, 17, "div", 3),
          h(),
          p(4, "div", 4)(5, "button", 5),
          z("click", function () {
            return o.closeImageSelector();
          }),
          m(6, " X "),
          h(),
          ne(7, "app-image-selector"),
          h()),
          i & 2 &&
            (y(3),
            T("ngIf", o.model),
            y(),
            T("ngClass", Ia(2, fA, o.isImageOpen, !o.isImageOpen)));
      },
      dependencies: [
        Wa,
        it,
        Oe,
        It,
        Al,
        Nl,
        ot,
        Ro,
        mi,
        Ct,
        Et,
        pt,
        ht,
        bi,
        Fl,
        ze,
        ri,
      ],
    }));
  let t = e;
  return t;
})();
var yA = (t) => ["/blog", t];
function vA(t, e) {
  if (
    (t & 1 &&
      (p(0, "div", 5)(1, "div", 6),
      ne(2, "img", 7),
      p(3, "div", 8)(4, "h5", 9),
      m(5),
      h(),
      p(6, "p", 10),
      m(7),
      h(),
      p(8, "span", 11)(9, "a", 12),
      m(10, "Read more"),
      h()()()()()),
    t & 2)
  ) {
    let r = e.$implicit;
    y(2),
      T("src", r.featuredImageUrl, kt)("alt", r.title),
      y(3),
      Qt(" ", r.title, " "),
      y(2),
      re(r.shortDescription),
      y(2),
      T("routerLink", Jr(5, yA, r.urlHnadle));
  }
}
function DA(t, e) {
  if ((t & 1 && (Ue(0), G(1, vA, 11, 7, "div", 4), He()), t & 2)) {
    let r = e.ngIf;
    y(), T("ngForOf", r);
  }
}
var y0 = (() => {
  let e = class e {
    constructor(n) {
      this.blogPostService = n;
    }
    ngOnInit() {
      this.blogPosts$ = this.blogPostService.getAllBlogPosts();
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(rn));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-home"]],
      decls: 5,
      vars: 3,
      consts: [
        [1, "container"],
        [1, "my-5"],
        [1, "row", "align-items-strech"],
        [4, "ngIf"],
        ["class", "col-12 col-md-4 mb-4", 4, "ngFor", "ngForOf"],
        [1, "col-12", "col-md-4", "mb-4"],
        [1, "card", "h-100"],
        [1, "card-img-top", 3, "src", "alt"],
        [1, "card-body", "d-flex", "flex-column"],
        [1, "card-title"],
        [1, "card-text"],
        [1, "d-flex", "align-items-end", 2, "flex", "1"],
        [1, "btn", "btn-primary", 3, "routerLink"],
      ],
      template: function (i, o) {
        i & 1 &&
          (p(0, "div", 0)(1, "div", 1)(2, "div", 2),
          G(3, DA, 2, 1, "ng-container", 3),
          Me(4, "async"),
          h()()()),
          i & 2 && (y(3), T("ngIf", je(4, 1, o.blogPosts$)));
      },
      dependencies: [it, Oe, Qn, ze],
    }));
  let t = e;
  return t;
})();
function wA(t, e) {
  if ((t & 1 && (p(0, "span", 12), m(1), h()), t & 2)) {
    let r = e.$implicit;
    y(), Qt(" ", r.name, " ");
  }
}
function bA(t, e) {
  if ((t & 1 && (p(0, "div", 6), G(1, wA, 2, 1, "span", 11), h()), t & 2)) {
    let r = ce().ngIf;
    y(), T("ngForOf", r.categories);
  }
}
function CA(t, e) {
  if (
    (t & 1 &&
      (Ue(0),
      p(1, "div", 2)(2, "div", 3)(3, "div", 4),
      ne(4, "img", 5),
      p(5, "h1", 6),
      m(6),
      h(),
      p(7, "div", 7)(8, "span"),
      m(9),
      h(),
      p(10, "span"),
      m(11),
      Me(12, "date"),
      h()(),
      G(13, bA, 2, 1, "div", 8),
      p(14, "div", 9),
      ne(15, "markdown", 10),
      h()()()(),
      He()),
    t & 2)
  ) {
    let r = e.ngIf;
    y(4),
      T("src", r.featuredImageUrl, kt)("title", r.title),
      y(2),
      re(r.title),
      y(3),
      re(r.author),
      y(2),
      re(ei(12, 7, r.publishedDate, "yyyy-MM-dd")),
      y(2),
      T("ngIf", r.categories),
      y(2),
      T("data", r.content);
  }
}
function EA(t, e) {
  t & 1 &&
    (p(0, "div", 13)(1, "div", 14)(2, "span", 15), m(3, "Loading..."), h()()());
}
var v0 = (() => {
  let e = class e {
    constructor(n, i) {
      (this.blogPostService = n), (this.route = i), (this.url = null);
    }
    ngOnInit() {
      this.route.paramMap.subscribe({
        next: (n) => {
          this.url = n.get("url");
        },
      }),
        this.getBlogByUrl();
    }
    getBlogByUrl() {
      this.url &&
        (this.blogPost$ = this.blogPostService.getBlogPostByUrl(this.url));
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(rn), w(ft));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-blog-details"]],
      decls: 4,
      vars: 4,
      consts: [
        ["loader", ""],
        [4, "ngIf", "ngIfElse"],
        [1, "container"],
        [1, "py-5"],
        [1, "col-12", "col-md-8", "col-lg-6", "mx-auto"],
        [1, "img-fluid", 3, "src", "title"],
        [1, "mt-4"],
        [1, "d-flex", "justify-content-between", "mt-4"],
        ["class", "mt-4", 4, "ngIf"],
        [1, "mt-4", "blog-content"],
        [3, "data"],
        ["class", "badge bg-secondary me-2", 4, "ngFor", "ngForOf"],
        [1, "badge", "bg-secondary", "me-2"],
        [1, "text-center", "mt-5"],
        ["role", "status", 1, "spinner-border"],
        [1, "visually-hidden"],
      ],
      template: function (i, o) {
        if (
          (i & 1 &&
            (G(0, CA, 16, 10, "ng-container", 1),
            Me(1, "async"),
            G(2, EA, 4, 0, "ng-template", null, 0, _a)),
          i & 2)
        ) {
          let s = Ea(3);
          T("ngIf", je(1, 2, o.blogPost$))("ngIfElse", s);
        }
      },
      dependencies: [it, Oe, bi, ze, ri],
    }));
  let t = e;
  return t;
})();
var Ci = (() => {
  let e = class e {
    constructor(n, i) {
      (this.http = n), (this.cookieService = i), (this.$user = new we(void 0));
    }
    login(n) {
      return this.http.post(`${Pe.baseApiUrl}/api/Auth/login`, {
        email: n.email,
        password: n.password,
      });
    }
    setUser(n) {
      this.$user.next(n),
        localStorage.setItem("user-email", n.email),
        localStorage.setItem("user-roles", n.roles.join(","));
    }
    getUser() {
      let n = localStorage.getItem("user-email"),
        i = localStorage.getItem("user-roles");
      if (n && i) return { email: n, roles: i?.split(",") };
    }
    user() {
      return this.$user.asObservable();
    }
    logout() {
      localStorage.clear(),
        this.cookieService.delete("Authorization", "/"),
        this.$user.next(void 0);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(Vt), b(tn));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac, providedIn: "root" }));
  let t = e;
  return t;
})();
var w0 = (() => {
  let e = class e {
    constructor(n, i, o) {
      (this.authService = n),
        (this.cookieService = i),
        (this.router = o),
        (this.user = 'Normal User "Reader-Role"'),
        (this.admin = 'Admin User "Writer/Reader-Roles"'),
        (this.email1 = "Email: admin@codepulse.com"),
        (this.password1 = "Password: Admin@123"),
        (this.email = "Email: firas.s.main1@gmail.com"),
        (this.password = "Password: Firas@123"),
        (this.model = { email: "", password: "" });
    }
    onSubmit() {
      this.authService.login(this.model).subscribe({
        next: (n) => {
          this.cookieService.set(
            "Authorization",
            `Bearer ${n.token}`,
            void 0,
            "/",
            void 0,
            !0,
            "Strict"
          ),
            this.router.navigate(["/"]),
            this.authService.setUser({ email: n.email, roles: n.roles });
        },
      });
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(Ci), w(tn), w(ve));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-login"]],
      decls: 34,
      vars: 8,
      consts: [
        ["form", "ngForm"],
        [1, "container"],
        [1, "mt-5"],
        [1, "col-12", "col-md-6", "col-lg-4", "mx-auto"],
        [3, "ngSubmit"],
        [1, "mt-3"],
        [1, "form-label"],
        [
          "type",
          "email",
          "name",
          "email",
          "id",
          "email",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        [
          "type",
          "password",
          "name",
          "password",
          "id",
          "password",
          1,
          "form-control",
          3,
          "ngModelChange",
          "ngModel",
        ],
        ["type", "submit", 1, "btn", "btn-primary"],
        [1, "mt-5", 2, "border", "solid black 1px", "padding", "10px"],
        [2, "border", "solid black 1px", "padding", "20px 0 10px 20px"],
      ],
      template: function (i, o) {
        if (i & 1) {
          let s = Ve();
          p(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "h1"),
            m(4, "Login"),
            h(),
            p(5, "form", 4, 0),
            z("ngSubmit", function () {
              return R(s), O(o.onSubmit());
            }),
            p(7, "div", 5)(8, "label", 6),
            m(9, "Email"),
            h(),
            p(10, "input", 7),
            Y("ngModelChange", function (l) {
              return R(s), J(o.model.email, l) || (o.model.email = l), O(l);
            }),
            h()(),
            p(11, "div", 5)(12, "label", 6),
            m(13, "Password"),
            h(),
            p(14, "input", 8),
            Y("ngModelChange", function (l) {
              return (
                R(s), J(o.model.password, l) || (o.model.password = l), O(l)
              );
            }),
            h()(),
            p(15, "div", 5)(16, "button", 9),
            m(17, "Login"),
            h()()(),
            p(18, "div", 10)(19, "h4"),
            m(20, "Login Users"),
            h()(),
            p(21, "div", 11)(22, "h5"),
            m(23),
            h(),
            p(24, "p"),
            m(25),
            h(),
            p(26, "p"),
            m(27),
            h(),
            p(28, "h5"),
            m(29),
            h(),
            p(30, "p"),
            m(31),
            h(),
            p(32, "p"),
            m(33),
            h()()()()();
        }
        i & 2 &&
          (y(10),
          Q("ngModel", o.model.email),
          y(4),
          Q("ngModel", o.model.password),
          y(9),
          re(o.admin),
          y(2),
          re(o.email1),
          y(2),
          re(o.password1),
          y(2),
          re(o.user),
          y(2),
          re(o.email),
          y(2),
          re(o.password));
      },
      dependencies: [It, ot, Ct, Et, pt, ht],
    }));
  let t = e;
  return t;
})();
var Cr = class extends Error {};
Cr.prototype.name = "InvalidTokenError";
function IA(t) {
  return decodeURIComponent(
    atob(t).replace(/(.)/g, (e, r) => {
      let n = r.charCodeAt(0).toString(16).toUpperCase();
      return n.length < 2 && (n = "0" + n), "%" + n;
    })
  );
}
function _A(t) {
  let e = t.replace(/-/g, "+").replace(/_/g, "/");
  switch (e.length % 4) {
    case 0:
      break;
    case 2:
      e += "==";
      break;
    case 3:
      e += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return IA(e);
  } catch {
    return atob(e);
  }
}
function b0(t, e) {
  if (typeof t != "string")
    throw new Cr("Invalid token specified: must be a string");
  e || (e = {});
  let r = e.header === !0 ? 0 : 1,
    n = t.split(".")[r];
  if (typeof n != "string")
    throw new Cr(`Invalid token specified: missing part #${r + 1}`);
  let i;
  try {
    i = _A(n);
  } catch (o) {
    throw new Cr(
      `Invalid token specified: invalid base64 for part #${r + 1} (${
        o.message
      })`
    );
  }
  try {
    return JSON.parse(i);
  } catch (o) {
    throw new Cr(
      `Invalid token specified: invalid json for part #${r + 1} (${o.message})`
    );
  }
}
var Er = (t, e) => {
  let r = D(tn),
    n = D(Ci),
    i = D(ve),
    o = n.getUser(),
    s = r.get("Authorization");
  if (s && o) {
    s = s.replace("Bearer", "");
    let l = b0(s).exp * 1e3,
      c = new Date().getTime();
    return l < c
      ? (n.logout(),
        i.createUrlTree(["/login"], { queryParams: { returnUrl: e.url } }))
      : o.roles.includes("Writer")
      ? !0
      : (alert("Unauthorized"), !1);
  } else
    return (
      n.logout(),
      i.createUrlTree(["/login"], { queryParams: { returnUrl: e.url } })
    );
};
var SA = [
    { path: "", component: y0 },
    { path: "blog/:url", component: v0 },
    { path: "admin/categories", component: wv, canActivate: [Er] },
    { path: "admin/categories/add", component: Wv, canActivate: [Er] },
    { path: "admin/categories/:id", component: Gv, canActivate: [Er] },
    { path: "admin/blogposts", component: qv, canActivate: [Er] },
    { path: "admin/blogposts/add", component: g0, canActivate: [Er] },
    { path: "admin/blogposts/:id", component: m0, canActivate: [Er] },
    { path: "login", component: w0 },
  ],
  C0 = (() => {
    let e = class e {};
    (e.ɵfac = function (i) {
      return new (i || e)();
    }),
      (e.ɵmod = Re({ type: e })),
      (e.ɵinj = Ne({ imports: [Pf.forRoot(SA), Pf] }));
    let t = e;
    return t;
  })();
var MA = () => ["/admin/categories"],
  xA = () => ["/admin/blogposts"],
  TA = () => ["/login"];
function AA(t, e) {
  t & 1 &&
    (Ue(0),
    p(1, "li", 13)(2, "a", 14),
    m(3, " Admin "),
    h(),
    p(4, "ul", 15)(5, "li")(6, "a", 16),
    m(7, "Categories"),
    h()(),
    p(8, "li"),
    ne(9, "hr", 17),
    h(),
    p(10, "li")(11, "a", 16),
    m(12, "BlogPost"),
    h()()()(),
    He()),
    t & 2 &&
      (y(6), T("routerLink", Bn(2, MA)), y(5), T("routerLink", Bn(3, xA)));
}
function NA(t, e) {
  t & 1 && (Ue(0), p(1, "a", 18), m(2, "Login"), h(), He()),
    t & 2 && (y(), T("routerLink", Bn(1, TA)));
}
function RA(t, e) {
  if (t & 1) {
    let r = Ve();
    p(0, "div", 19)(1, "span"),
      m(2),
      h(),
      p(3, "button", 20),
      z("click", function () {
        R(r);
        let i = ce();
        return O(i.onLogout());
      }),
      m(4, " Logout "),
      h()();
  }
  if (t & 2) {
    let r = ce();
    y(2), re(r.user == null ? null : r.user.email);
  }
}
var E0 = (() => {
  let e = class e {
    constructor(n, i) {
      (this.authService = n), (this.Router = i);
    }
    ngOnInit() {
      this.authService.user().subscribe({
        next: (n) => {
          this.user = n;
        },
      }),
        (this.user = this.authService.getUser());
    }
    onLogout() {
      this.authService.logout(), this.Router.navigate(["/login"]);
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(w(Ci), w(ve));
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-navbar"]],
      decls: 16,
      vars: 3,
      consts: [
        ["showLogout", ""],
        [1, "navbar", "navbar-expand-lg", "bg-body-tertiary"],
        [1, "container"],
        ["href", "#", 1, "navbar-brand"],
        [
          "type",
          "button",
          "data-bs-toggle",
          "collapse",
          "data-bs-target",
          "#navbarSupportedContent",
          "aria-controls",
          "navbarSupportedContent",
          "aria-expanded",
          "false",
          "aria-label",
          "Toggle navigation",
          1,
          "navbar-toggler",
        ],
        [1, "navbar-toggler-icon"],
        ["id", "navbarSupportedContent", 1, "collapse", "navbar-collapse"],
        [1, "navbar-nav", "me-auto", "mb-2", "mb-lg-0"],
        [1, "nav-item"],
        ["aria-current", "page", "href", "#", 1, "nav-link", "active"],
        [4, "ngIf"],
        [1, "d-flex"],
        [4, "ngIf", "ngIfElse"],
        [1, "nav-item", "dropdown"],
        [
          "href",
          "#",
          "role",
          "button",
          "data-bs-toggle",
          "dropdown",
          "aria-expanded",
          "false",
          1,
          "nav-link",
          "dropdown-toggle",
        ],
        [1, "dropdown-menu"],
        [1, "dropdown-item", 3, "routerLink"],
        [1, "dropdown-divider"],
        [1, "btn", "btn-primary", 3, "routerLink"],
        [1, "d-flex", "align-items-center"],
        [1, "btn", "btn-primary", "ms-3", 3, "click"],
      ],
      template: function (i, o) {
        if (
          (i & 1 &&
            (p(0, "nav", 1)(1, "div", 2)(2, "a", 3),
            m(3, "Navbar"),
            h(),
            p(4, "button", 4),
            ne(5, "span", 5),
            h(),
            p(6, "div", 6)(7, "ul", 7)(8, "li", 8)(9, "a", 9),
            m(10, "Home"),
            h()(),
            G(11, AA, 13, 4, "ng-container", 10),
            h(),
            p(12, "div", 11),
            G(13, NA, 3, 2, "ng-container", 12)(
              14,
              RA,
              5,
              1,
              "ng-template",
              null,
              0,
              _a
            ),
            h()()()()),
          i & 2)
        ) {
          let s = Ea(15);
          y(11),
            T("ngIf", o.user !== void 0 && o.user.roles.includes("Writer")),
            y(2),
            T("ngIf", o.user === void 0)("ngIfElse", s);
        }
      },
      dependencies: [Oe, Qn],
    }));
  let t = e;
  return t;
})();
var I0 = (() => {
  let e = class e {
    constructor() {
      this.title = "codepulse";
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵcmp = te({
      type: e,
      selectors: [["app-root"]],
      decls: 2,
      vars: 0,
      template: function (i, o) {
        i & 1 && ne(0, "app-navbar")(1, "router-outlet");
      },
      dependencies: [xf, E0],
    }));
  let t = e;
  return t;
})();
var _0 = (() => {
  let e = class e {
    constructor(n) {
      this.cookieService = n;
    }
    intercept(n, i) {
      if (this.shouldInterceptRequest(n)) {
        let o = n.clone({
          setHeaders: {
            Authorization: this.cookieService.get("Authorization"),
          },
        });
        return i.handle(o);
      } else return i.handle(n);
    }
    shouldInterceptRequest(n) {
      return n.urlWithParams.indexOf("addAuth=true", 0) > -1;
    }
  };
  (e.ɵfac = function (i) {
    return new (i || e)(b(tn));
  }),
    (e.ɵprov = E({ token: e, factory: e.ɵfac }));
  let t = e;
  return t;
})();
var S0 = (() => {
  let e = class e {};
  (e.ɵfac = function (i) {
    return new (i || e)();
  }),
    (e.ɵmod = Re({ type: e, bootstrap: [I0] })),
    (e.ɵinj = Ne({
      providers: [{ provide: Ld, useClass: _0, multi: !0 }],
      imports: [Ay, C0, zv, by, h0.forRoot()],
    }));
  let t = e;
  return t;
})();
Ty()
  .bootstrapModule(S0)
  .catch((t) => console.error(t));
