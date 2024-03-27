import { isObjectPlain } from "./mod.ts";
class Sample1 {
	x: unknown;
	constructor(x: unknown) {
		this.x = x;
	}
}
function Sample2() { }
Sample2.prototype.constructor = Object;
Deno.bench("False 1", { permissions: "none" }, () => {
	isObjectPlain(new Map([
		["a", 1],
		["b", 2],
		["c", 3]
	]));
});
Deno.bench("False 2", { permissions: "none" }, () => {
	isObjectPlain(['foo', 'bar']);
});
Deno.bench("False 3", { permissions: "none" }, () => {
	isObjectPlain(new Sample1(1));
});
Deno.bench("False 4", { permissions: "none" }, () => {
	isObjectPlain(Math);
});
Deno.bench("False 5", { permissions: "none" }, () => {
	isObjectPlain(JSON);
});
Deno.bench("False 6", { permissions: "none" }, () => {
	isObjectPlain(Atomics);
});
Deno.bench("False 7", { permissions: "none" }, () => {
	isObjectPlain(Error);
});
Deno.bench("False 8", { permissions: "none" }, () => {
	isObjectPlain(() => { });
});
Deno.bench("False 9", { permissions: "none" }, () => {
	isObjectPlain(/./);
});
Deno.bench("False 10", { permissions: "none" }, () => {
	isObjectPlain(null as unknown as object);
});
Deno.bench("False 11", { permissions: "none" }, () => {
	isObjectPlain(undefined as unknown as object);
});
Deno.bench("False 12", { permissions: "none" }, () => {
	isObjectPlain(Number.NaN as unknown as object);
});
Deno.bench("False 13", { permissions: "none" }, () => {
	isObjectPlain('' as unknown as object);
});
Deno.bench("False 14", { permissions: "none" }, () => {
	isObjectPlain(0 as unknown as object);
});
Deno.bench("False 15", { permissions: "none" }, () => {
	isObjectPlain(false as unknown as object);
});
Deno.bench("False 16", { permissions: "none" }, () => {
	//@ts-ignore For test only.
	isObjectPlain(new Sample2() as unknown as object);
});
Deno.bench("False 17", { permissions: "none" }, () => {
	isObjectPlain(Object.create({}));
});
Deno.bench("False 18", { permissions: "none" }, () => {
	isObjectPlain({ constructor: Sample1 });
});
Deno.bench("False 19", { permissions: "none" }, () => {
	isObjectPlain(Object.create(null));
});
Deno.bench("False 20", { permissions: "none" }, () => {
	(function () {
		isObjectPlain(arguments);
	})();
});
Deno.bench("True 1", { permissions: "none" }, () => {
	isObjectPlain({
		a: 1,
		b: 2,
		c: 3
	});
});
Deno.bench("True 2", { permissions: "none" }, () => {
	isObjectPlain({});
});
Deno.bench("True 3", { permissions: "none" }, () => {
	isObjectPlain({ foo: true });
});
Deno.bench("True 4", { permissions: "none" }, () => {
	isObjectPlain({ valueOf: 0 });
});
Deno.bench("True 5", { permissions: "none" }, () => {
	isObjectPlain(new Object());
});
