import { assertEquals } from "TEST/assert_equals.ts";
import { isObjectPlain } from "./mod.ts";
Deno.test("False 1", { permissions: "none" }, () => {
	assertEquals(isObjectPlain(new Map([
		["a", 1],
		["b", 2],
		["c", 3]
	])), false);
});
Deno.test("True 1", { permissions: "none" }, () => {
	assertEquals(isObjectPlain({
		a: 1,
		b: 2,
		c: 3
	}), true);
});
