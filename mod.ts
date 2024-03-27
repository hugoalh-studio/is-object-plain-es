/**
 * Determine whether the object is plain.
 * @param {object} item Item that need to determine.
 * @returns {boolean} Determine result.
 */
export function isObjectPlain(item: object): boolean {
	if (
		!(item instanceof Object) ||
		item.constructor.name !== "Object" ||
		Object.prototype.toString.call(item) !== "[object Object]"
	) {
		return false;
	}
	const itemPrototype: unknown = Object.getPrototypeOf(item);
	if (itemPrototype !== null && itemPrototype !== Object.prototype) {
		return false;
	}
	let itemShadow: object = item;
	while (Object.getPrototypeOf(itemShadow) !== null) {
		itemShadow = Object.getPrototypeOf(itemShadow);
	}
	if (itemPrototype !== itemShadow) {
		return false;
	}
	if (Object.getOwnPropertySymbols(item).length > 0) {
		return false;
	}
	const itemDescriptors = Object.getOwnPropertyDescriptors(item);
	let enumerableCount = 0;
	for (const descriptor in itemDescriptors) {
		if (Object.hasOwn(itemDescriptors, descriptor)) {
			const descriptorProperties: PropertyDescriptor = itemDescriptors[descriptor];
			if (
				!descriptorProperties.configurable ||
				!descriptorProperties.enumerable ||
				!descriptorProperties.writable ||
				typeof descriptorProperties.get !== "undefined" ||
				typeof descriptorProperties.set !== "undefined"
			) {
				return false;
			}
			enumerableCount += 1;
		} else {
			return false;
		}
	}
	if (Object.entries(item).length !== enumerableCount) {
		return false;
	}
	return true;
}
export default isObjectPlain;
