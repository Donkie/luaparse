describe('functioncalls', function() {
  it('a(                                      -- FAIL', function() {
    expect(parser.parse('a(', {wait:true}).end).to.throwError(/^\[1:2\] '\)' expected near '<eof>'$/);
  });
  it('a()', function() {
    expect(parser.parse('a()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "a"
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a(1)', function() {
    expect(parser.parse('a(1)')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "a"
            },
            "arguments": [
              {
                "type": "NumericLiteral",
                "value": 1,
                "raw": "1"
              }
            ]
          }
        }
      ],
      "comments": []
    });
  });
  it('a(1,)                                   -- FAIL', function() {
    expect(parser.parse('a(1,)', {wait:true}).end).to.throwError(/^\[1:4\] <expression> expected near '\)'$/);
  });
  it('a(1,2,3)', function() {
    expect(parser.parse('a(1,2,3)')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "a"
            },
            "arguments": [
              {
                "type": "NumericLiteral",
                "value": 1,
                "raw": "1"
              },
              {
                "type": "NumericLiteral",
                "value": 2,
                "raw": "2"
              },
              {
                "type": "NumericLiteral",
                "value": 3,
                "raw": "3"
              }
            ]
          }
        }
      ],
      "comments": []
    });
  });
  it('1()                                     -- FAIL', function() {
    expect(parser.parse('1()', {wait:true}).end).to.throwError(/^\[1:0\] Unexpected number '1' near '\('$/);
  });
  it('a()()', function() {
    expect(parser.parse('a()()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "CallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "arguments": []
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a.b()', function() {
    expect(parser.parse('a.b()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a[b]()', function() {
    expect(parser.parse('a[b]()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "index": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a.1                                     -- FAIL', function() {
    expect(parser.parse('a.1', {wait:true}).end).to.throwError(/^\[1:0\] Unexpected identifier 'a' near '<eof>'$/);
  });
  it('a.b                                     -- FAIL', function() {
    expect(parser.parse('a.b', {wait:true}).end).to.throwError(/^\[1:0\] Unexpected identifier 'a' near '<eof>'$/);
  });
  it('a[b]                                    -- FAIL', function() {
    expect(parser.parse('a[b]', {wait:true}).end).to.throwError(/^\[1:0\] Unexpected identifier 'a' near '<eof>'$/);
  });
  it('a.b.(                                   -- FAIL', function() {
    expect(parser.parse('a.b.(', {wait:true}).end).to.throwError(/^\[1:4\] <name> expected near '\('$/);
  });
  it('a.b.c()', function() {
    expect(parser.parse('a.b.c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "b"
                },
                "base": {
                  "type": "Identifier",
                  "name": "a"
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a[b][c]()', function() {
    expect(parser.parse('a[b][c]()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "index": {
                  "type": "Identifier",
                  "name": "b"
                }
              },
              "index": {
                "type": "Identifier",
                "name": "c"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a[b].c()', function() {
    expect(parser.parse('a[b].c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "index": {
                  "type": "Identifier",
                  "name": "b"
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a.b[c]()', function() {
    expect(parser.parse('a.b[c]()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "b"
                },
                "base": {
                  "type": "Identifier",
                  "name": "a"
                }
              },
              "index": {
                "type": "Identifier",
                "name": "c"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a:b()', function() {
    expect(parser.parse('a:b()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a:b                                     -- FAIL', function() {
    expect(parser.parse('a:b', {wait:true}).end).to.throwError(/^\[1:3\] function arguments expected near '<eof>'$/);
  });
  it('a:1                                     -- FAIL', function() {
    expect(parser.parse('a:1', {wait:true}).end).to.throwError(/^\[1:2\] <name> expected near '1'$/);
  });
  it('a.b:c()', function() {
    expect(parser.parse('a.b:c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "b"
                },
                "base": {
                  "type": "Identifier",
                  "name": "a"
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a[b]:c()', function() {
    expect(parser.parse('a[b]:c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "index": {
                  "type": "Identifier",
                  "name": "b"
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a:b:                                    -- FAIL', function() {
    expect(parser.parse('a:b:', {wait:true}).end).to.throwError(/^\[1:3\] function arguments expected near ':'$/);
  });
  it('a:b():c()', function() {
    expect(parser.parse('a:b():c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "CallExpression",
                "base": {
                  "type": "MemberExpression",
                  "indexer": ":",
                  "identifier": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "base": {
                    "type": "Identifier",
                    "name": "a"
                  }
                },
                "arguments": []
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a:b().c[d]:e()', function() {
    expect(parser.parse('a:b().c[d]:e()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "MemberExpression",
                  "indexer": ".",
                  "identifier": {
                    "type": "Identifier",
                    "name": "c"
                  },
                  "base": {
                    "type": "CallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "arguments": []
                  }
                },
                "index": {
                  "type": "Identifier",
                  "name": "d"
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a:b()[c].d:e()', function() {
    expect(parser.parse('a:b()[c].d:e()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "d"
                },
                "base": {
                  "type": "IndexExpression",
                  "base": {
                    "type": "CallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "arguments": []
                  },
                  "index": {
                    "type": "Identifier",
                    "name": "c"
                  }
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a)()', function() {
    expect(parser.parse('(a)()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "Identifier",
              "name": "a"
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('()()                                    -- FAIL', function() {
    expect(parser.parse('()()', {wait:true}).end).to.throwError(/^\[1:2\] <expression> expected near '\('$/);
  });
  it('(1)()', function() {
    expect(parser.parse('(1)()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "NumericLiteral",
              "value": 1,
              "raw": "1"
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('("foo")()', function() {
    expect(parser.parse('("foo")()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "StringLiteral",
              "value": "foo",
              "raw": "\"foo\""
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(true)()', function() {
    expect(parser.parse('(true)()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "BooleanLiteral",
              "value": true,
              "raw": "true"
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a)()()', function() {
    expect(parser.parse('(a)()()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "CallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "arguments": []
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a.b)()', function() {
    expect(parser.parse('(a.b)()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a[b])()', function() {
    expect(parser.parse('(a[b])()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "index": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a).b()', function() {
    expect(parser.parse('(a).b()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a)[b]()', function() {
    expect(parser.parse('(a)[b]()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "index": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b()', function() {
    expect(parser.parse('(a):b()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a).b[c]:d()', function() {
    expect(parser.parse('(a).b[c]:d()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "d"
              },
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "MemberExpression",
                  "indexer": ".",
                  "identifier": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "base": {
                    "type": "Identifier",
                    "name": "a"
                  }
                },
                "index": {
                  "type": "Identifier",
                  "name": "c"
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a)[b].c:d()', function() {
    expect(parser.parse('(a)[b].c:d()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "d"
              },
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "c"
                },
                "base": {
                  "type": "IndexExpression",
                  "base": {
                    "type": "Identifier",
                    "name": "a"
                  },
                  "index": {
                    "type": "Identifier",
                    "name": "b"
                  }
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b():c()', function() {
    expect(parser.parse('(a):b():c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "CallExpression",
                "base": {
                  "type": "MemberExpression",
                  "indexer": ":",
                  "identifier": {
                    "type": "Identifier",
                    "name": "b"
                  },
                  "base": {
                    "type": "Identifier",
                    "name": "a"
                  }
                },
                "arguments": []
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b().c[d]:e()', function() {
    expect(parser.parse('(a):b().c[d]:e()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "MemberExpression",
                  "indexer": ".",
                  "identifier": {
                    "type": "Identifier",
                    "name": "c"
                  },
                  "base": {
                    "type": "CallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "arguments": []
                  }
                },
                "index": {
                  "type": "Identifier",
                  "name": "d"
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b()[c].d:e()', function() {
    expect(parser.parse('(a):b()[c].d:e()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "d"
                },
                "base": {
                  "type": "IndexExpression",
                  "base": {
                    "type": "CallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "arguments": []
                  },
                  "index": {
                    "type": "Identifier",
                    "name": "c"
                  }
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a"foo"', function() {
    expect(parser.parse('a"foo"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "Identifier",
              "name": "a"
            },
            "argument": "foo"
          }
        }
      ],
      "comments": []
    });
  });
  it('a[[foo]]', function() {
    expect(parser.parse('a[[foo]]')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "Identifier",
              "name": "a"
            },
            "argument": "foo"
          }
        }
      ],
      "comments": []
    });
  });
  it('a.b"foo"', function() {
    expect(parser.parse('a.b"foo"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "argument": "foo"
          }
        }
      ],
      "comments": []
    });
  });
  it('a[b]"foo"', function() {
    expect(parser.parse('a[b]"foo"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "index": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "argument": "foo"
          }
        }
      ],
      "comments": []
    });
  });
  it('a:b"foo"', function() {
    expect(parser.parse('a:b"foo"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "argument": "foo"
          }
        }
      ],
      "comments": []
    });
  });
  it('a{}', function() {
    expect(parser.parse('a{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "Identifier",
              "name": "a"
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('a.b{}', function() {
    expect(parser.parse('a.b{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('a[b]{}', function() {
    expect(parser.parse('a[b]{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "index": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('a:b{}', function() {
    expect(parser.parse('a:b{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "Identifier",
                "name": "a"
              }
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('a()"foo"', function() {
    expect(parser.parse('a()"foo"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "CallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "arguments": []
            },
            "argument": "foo"
          }
        }
      ],
      "comments": []
    });
  });
  it('a"foo"()', function() {
    expect(parser.parse('a"foo"()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "StringCallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "argument": "foo"
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a"foo".b()', function() {
    expect(parser.parse('a"foo".b()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "StringCallExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "argument": "foo"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a"foo"[b]()', function() {
    expect(parser.parse('a"foo"[b]()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "StringCallExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "argument": "foo"
              },
              "index": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a"foo":c()', function() {
    expect(parser.parse('a"foo":c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "StringCallExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "argument": "foo"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a"foo""bar"', function() {
    expect(parser.parse('a"foo""bar"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "StringCallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "argument": "foo"
            },
            "argument": "bar"
          }
        }
      ],
      "comments": []
    });
  });
  it('a"foo"{}', function() {
    expect(parser.parse('a"foo"{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "StringCallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "argument": "foo"
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b"foo".c[d]:e"bar"', function() {
    expect(parser.parse('(a):b"foo".c[d]:e"bar"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "MemberExpression",
                  "indexer": ".",
                  "identifier": {
                    "type": "Identifier",
                    "name": "c"
                  },
                  "base": {
                    "type": "StringCallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "argument": "foo"
                  }
                },
                "index": {
                  "type": "Identifier",
                  "name": "d"
                }
              }
            },
            "argument": "bar"
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b"foo"[c].d:e"bar"', function() {
    expect(parser.parse('(a):b"foo"[c].d:e"bar"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "d"
                },
                "base": {
                  "type": "IndexExpression",
                  "base": {
                    "type": "StringCallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "argument": "foo"
                  },
                  "index": {
                    "type": "Identifier",
                    "name": "c"
                  }
                }
              }
            },
            "argument": "bar"
          }
        }
      ],
      "comments": []
    });
  });
  it('a(){}', function() {
    expect(parser.parse('a(){}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "CallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "arguments": []
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('a{}()', function() {
    expect(parser.parse('a{}()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "TableCallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "arguments": {
                "type": "TableConstructorExpression",
                "fields": []
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a{}.b()', function() {
    expect(parser.parse('a{}.b()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ".",
              "identifier": {
                "type": "Identifier",
                "name": "b"
              },
              "base": {
                "type": "TableCallExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "arguments": {
                  "type": "TableConstructorExpression",
                  "fields": []
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a{}[b]()', function() {
    expect(parser.parse('a{}[b]()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "IndexExpression",
              "base": {
                "type": "TableCallExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "arguments": {
                  "type": "TableConstructorExpression",
                  "fields": []
                }
              },
              "index": {
                "type": "Identifier",
                "name": "b"
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a{}:c()', function() {
    expect(parser.parse('a{}:c()')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "CallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "c"
              },
              "base": {
                "type": "TableCallExpression",
                "base": {
                  "type": "Identifier",
                  "name": "a"
                },
                "arguments": {
                  "type": "TableConstructorExpression",
                  "fields": []
                }
              }
            },
            "arguments": []
          }
        }
      ],
      "comments": []
    });
  });
  it('a{}"foo"', function() {
    expect(parser.parse('a{}"foo"')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "StringCallExpression",
            "base": {
              "type": "TableCallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "arguments": {
                "type": "TableConstructorExpression",
                "fields": []
              }
            },
            "argument": "foo"
          }
        }
      ],
      "comments": []
    });
  });
  it('a{}{}', function() {
    expect(parser.parse('a{}{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "TableCallExpression",
              "base": {
                "type": "Identifier",
                "name": "a"
              },
              "arguments": {
                "type": "TableConstructorExpression",
                "fields": []
              }
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b{}.c[d]:e{}', function() {
    expect(parser.parse('(a):b{}.c[d]:e{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "IndexExpression",
                "base": {
                  "type": "MemberExpression",
                  "indexer": ".",
                  "identifier": {
                    "type": "Identifier",
                    "name": "c"
                  },
                  "base": {
                    "type": "TableCallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "arguments": {
                      "type": "TableConstructorExpression",
                      "fields": []
                    }
                  }
                },
                "index": {
                  "type": "Identifier",
                  "name": "d"
                }
              }
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
  it('(a):b{}[c].d:e{}', function() {
    expect(parser.parse('(a):b{}[c].d:e{}')).to.eql({
      "type": "Chunk",
      "body": [
        {
          "type": "CallStatement",
          "expression": {
            "type": "TableCallExpression",
            "base": {
              "type": "MemberExpression",
              "indexer": ":",
              "identifier": {
                "type": "Identifier",
                "name": "e"
              },
              "base": {
                "type": "MemberExpression",
                "indexer": ".",
                "identifier": {
                  "type": "Identifier",
                  "name": "d"
                },
                "base": {
                  "type": "IndexExpression",
                  "base": {
                    "type": "TableCallExpression",
                    "base": {
                      "type": "MemberExpression",
                      "indexer": ":",
                      "identifier": {
                        "type": "Identifier",
                        "name": "b"
                      },
                      "base": {
                        "type": "Identifier",
                        "name": "a"
                      }
                    },
                    "arguments": {
                      "type": "TableConstructorExpression",
                      "fields": []
                    }
                  },
                  "index": {
                    "type": "Identifier",
                    "name": "c"
                  }
                }
              }
            },
            "arguments": {
              "type": "TableConstructorExpression",
              "fields": []
            }
          }
        }
      ],
      "comments": []
    });
  });
});
