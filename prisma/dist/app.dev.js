"use strict";

var express = require('express');

var _require = require('@prisma/client'),
    PrismaClient = _require.PrismaClient;

var app = express();
var prisma = new PrismaClient();
app.use(express.json());
app.post('/user', function _callee(req, res) {
  var _req$body, username, password, Mobile, cardId, user;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password, Mobile = _req$body.Mobile, cardId = _req$body.cardId;

          if (/^\d{1,10}$/.test(Mobile)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'Mobile ต้องเป็นตัวเลขไม่เกิน 10 หลัก'
          }));

        case 3:
          if (/^\d{1,13}$/.test(cardId)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'cardId ต้องเป็นตัวเลขไม่เกิน 13 หลัก'
          }));

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return regeneratorRuntime.awrap(prisma.user.create({
            data: {
              username: username,
              password: password,
              Mobile: Mobile,
              cardId: BigInt(cardId)
            }
          }));

        case 8:
          user = _context.sent;
          res.status(201).json(user);
          _context.next = 15;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](5);
          res.status(500).json({
            error: 'เกิดข้อผิดพลาด'
          });

        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 12]]);
});
app.listen(5555, function () {
  console.log('✅ Server running at http://localhost:5555');
});
//# sourceMappingURL=app.dev.js.map
