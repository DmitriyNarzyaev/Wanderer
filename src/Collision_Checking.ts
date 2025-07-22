import { Container, IPoint, Point } from "pixi.js";

export default class Collision_Checking {
	public static horizontal(obj1:Container, obj2:Container, type:string):boolean {
		if (!obj1.parent || !obj2.parent) {
			return false;
		}

		const obj1TopLeftGlobal:IPoint = obj1.parent.toGlobal(obj1.position);
		const obj2TopLeftGlobal:IPoint = obj2.parent.toGlobal(obj2.position);
		let obj1BottomRightGlobal:IPoint
		let obj2BottomRightGlobal:IPoint

		if (type == "wall") {
			obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width/2, obj1.y + obj1.height/2));
			obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width*1.5, obj2.y + obj2.height*1.5));

			return !(
				obj1BottomRightGlobal.x <= obj2TopLeftGlobal.x ||
				obj1TopLeftGlobal.x >= obj2BottomRightGlobal.x
			);
		} else if (type == "key") {
			obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width/2, obj1.y + obj1.height));
			obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width*2.3, obj2.y + obj2.height));

			return !(
				obj1BottomRightGlobal.x <= obj2TopLeftGlobal.x ||
				obj1TopLeftGlobal.x >= obj2BottomRightGlobal.x
			);
		} else if (type == "gate") {
			obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width/2, obj1.y + obj1.height));
			obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width, obj2.y + obj2.height));

			return !(
				obj1BottomRightGlobal.x <= obj2TopLeftGlobal.x ||
				obj1TopLeftGlobal.x >= obj2BottomRightGlobal.x
			);
		}
	}

	public static vertical(obj1:Container, obj2:Container, type:string):boolean {
		if (!obj1.parent || !obj2.parent) {
			return false;
		}

		const obj1TopLeftGlobal:IPoint = obj1.parent.toGlobal(obj1.position);
		const obj2TopLeftGlobal:IPoint = obj2.parent.toGlobal(obj2.position);
		let obj1BottomRightGlobal
		let obj2BottomRightGlobal

		if (type == "wall") {
			obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width/2, obj1.y + obj1.height/2));
			obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width*1.5, obj2.y + obj2.height*1.5));

			return !(
				obj1BottomRightGlobal.y <= obj2TopLeftGlobal.y ||
				obj1TopLeftGlobal.y >= obj2BottomRightGlobal.y
			);
		} else if (type == "key") {
			obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width, obj1.y + obj1.height/2));
			obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width, obj2.y + obj2.height*1.5));

			return !(
				obj1BottomRightGlobal.y <= obj2TopLeftGlobal.y ||
				obj1TopLeftGlobal.y >= obj2BottomRightGlobal.y
			);
		} else if (type == "gate") {
			obj1BottomRightGlobal = obj1.parent.toGlobal(new Point(obj1.x + obj1.width, obj1.y + obj1.height/2));
			obj2BottomRightGlobal = obj2.parent.toGlobal(new Point(obj2.x + obj2.width, obj2.y + obj2.height/1.1));

			return !(
				obj1BottomRightGlobal.y <= obj2TopLeftGlobal.y ||
				obj1TopLeftGlobal.y >= obj2BottomRightGlobal.y
			);
		}
	}
}
