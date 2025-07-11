"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CalendarWeek;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _propTypes2 = require("../utils/propTypes");
var propTypes = process.env.NODE_ENV !== "production" ? (0, _propTypes2.forbidExtraProps)({
  children: _propTypes["default"].node.isRequired
}) : {};
function CalendarWeek(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("tr", null, children);
}
CalendarWeek.propTypes = process.env.NODE_ENV !== "production" ? propTypes : {};