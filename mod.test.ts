import { assertEquals } from "STD/assert/equals";
import { isObjectPlain } from "./mod.ts";
class Sample1 {
	x: unknown;
	constructor(x: unknown) {
		this.x = x;
	}
}
function Sample2() { }
Sample2.prototype.constructor = Object;
Deno.test("Array With 2 Length", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(['foo', 'bar']), false);
});
Deno.test("Map", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Map([
		["a", 1],
		["b", 2],
		["c", 3]
	])), false);
});
Deno.test("Class Instance Standard", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Sample1(1)), false);
});
Deno.test("Math", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Math), false);
});
Deno.test("JSON", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(JSON), false);
});
Deno.test("Atomics", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Atomics), false);
});
Deno.test("Error Class", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Error), false);
});
Deno.test("Function", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(() => { }), false);
});
Deno.test("Regular Expression", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(/./), false);
});
Deno.test("`null`", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(null as unknown as object), false);
});
Deno.test("Class Instance Legacy", { permissions: "none" }, () => {
	//@ts-ignore For test only.
	assertEquals(isObjectPlain(new Sample2() as unknown as object), false);
});
Deno.test("InReg Object", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({ constructor: Sample1 }), false);
});
Deno.test("Function Arguments", { permissions: "none" }, () => {
	(function () {
		assertEquals(isObjectPlain(arguments), false);
	})();
});
Deno.test("Plain Object With 0 Entries", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({}), true);
});
Deno.test("Plain Object With 2 Primitive Entries", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({
		foo: true,
		valueOf: 0
	}), true);
});
Deno.test("Plain Object With 3 Primitive Entries", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({
		a: 1,
		b: 2,
		c: 3
	}), true);
});
Deno.test("Object Constructor With `null`", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Object.create(null)), false);
});
Deno.test("Object Constructor With `{}`", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Object.create({})), false);
});
Deno.test("Object Instance", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Object()), true);
});
