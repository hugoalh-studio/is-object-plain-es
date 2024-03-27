import { assertEquals } from "TEST/assert_equals.ts";
import { isObjectPlain } from "./mod.ts";
class Sample1 {
	x: unknown;
	constructor(x: unknown) {
		this.x = x;
	}
}
function Sample2() { }
Sample2.prototype.constructor = Object;
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Map([
		["a", 1],
		["b", 2],
		["c", 3]
	])), false);
});
Deno.test("False 2", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(['foo', 'bar']), false);
});
Deno.test("False 3", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Sample1(1)), false);
});
Deno.test("False 4", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Math), false);
});
Deno.test("False 5", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(JSON), false);
});
Deno.test("False 6", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Atomics), false);
});
Deno.test("False 7", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Error), false);
});
Deno.test("False 8", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(() => { }), false);
});
Deno.test("False 9", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(/./), false);
});
Deno.test("False 10", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(null as unknown as object), false);
});
Deno.test("False 11", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(undefined as unknown as object), false);
});
Deno.test("False 12", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Number.NaN as unknown as object), false);
});
Deno.test("False 13", { permissions: "none" }, () => {
	assertEquals(isObjectPlain('' as unknown as object), false);
});
Deno.test("False 14", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(0 as unknown as object), false);
});
Deno.test("False 15", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(false as unknown as object), false);
});
Deno.test("False 16", { permissions: "none" }, () => {
	//@ts-ignore For test only.
	assertEquals(isObjectPlain(new Sample2() as unknown as object), false);
});
Deno.test("False 17", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Object.create({})), false);
});
Deno.test("False 18", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({ constructor: Sample1 }), false);
});
Deno.test("False 19", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(Object.create(null)), false);
});
Deno.test("False 20", { permissions: "none" }, () => {
	(function () {
		assertEquals(isObjectPlain(arguments), false);
	})();
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({
		a: 1,
		b: 2,
		c: 3
	}), true);
});
Deno.test("True 2", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({}), true);
});
Deno.test("True 3", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({ foo: true }), true);
});
Deno.test("True 4", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({ valueOf: 0 }), true);
});
Deno.test("True 5", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Object()), true);
});
