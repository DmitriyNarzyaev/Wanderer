import { Container, IPoint, Point } from "pixi.js";

export default class Collision_Checking {
	public static horizontal(obj1:Container, obj2:Container):boolean {
		if (!obj1.parent || !obj2.parent) {
			return false;
		}

		const obj1TopLeftGlobal:IPoint = obj1.parent.toGlobal(obj1.position);
		const obj2TopLeftGlobal:IPoint = obj2.parent.toGlobal(obj2.position);
		const obj1BottomRightGlobal:IPoint = obj1.parent.toGlobal(new Point(obj1.x + obj1.width, obj1.y + obj1.height));
		const obj2BottomRightGlobal:IPoint = obj2.parent.toGlobal(new Point(obj2.x + obj2.width, obj2.y + obj2.height));

		return !(
			obj1BottomRightGlobal.x <= obj2TopLeftGlobal.x + 20 ||
			obj1TopLeftGlobal.x - 20 >= obj2BottomRightGlobal.x
		);
	}

	public static vertical(obj1:Container, obj2:Container):boolean {
		if (!obj1.parent || !obj2.parent) {
			return false;
		}

		const obj1TopLeftGlobal:IPoint = obj1.parent.toGlobal(obj1.position);
		const obj2TopLeftGlobal:IPoint = obj2.parent.toGlobal(obj2.position);
		const obj1BottomRightGlobal:IPoint = obj1.parent.toGlobal(new Point(obj1.x + obj1.width, obj1.y + obj1.height));
		const obj2BottomRightGlobal:IPoint = obj2.parent.toGlobal(new Point(obj2.x + obj2.width, obj2.y + obj2.height));

		return !(
			obj1BottomRightGlobal.y <= obj2TopLeftGlobal.y + 20 ||
			obj1TopLeftGlobal.y - 20 >= obj2BottomRightGlobal.y
		);
	}
}