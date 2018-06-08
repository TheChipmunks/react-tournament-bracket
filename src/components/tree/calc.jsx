export const calcRight = (object, treeOffset) => {
	return {
		x:
			Math.round(object.getBoundingClientRect().left) +
			object.clientWidth +
			object.clientLeft -
			treeOffset,
		y: object.offsetTop + object.clientHeight / 2
	};
};

export const calcLeft = (object, treeOffset) => {
	return {
		x: Math.round(object.getBoundingClientRect().left) - treeOffset,
		y: object.offsetTop + object.clientHeight / 2
	};
};

export const calcCenter = (object, treeOffset) => {
	return {
		x:
			Math.round(object.getBoundingClientRect().left) +
			object.clientWidth / 2 -
			treeOffset,
		y: object.offsetTop + object.clientHeight / 2
	};
};

export const lineDistanceFromEnd = (start, end, d) => {
	let [x, y] = [end.x, end.y];

	if (end.x - start.x < 0) x += d; // left
	if (end.x - start.x > 0) x -= d; // right
	if (end.y - start.y < 0) y += d; // up
	if (end.y - start.y > 0) y -= d; // down

	return { x, y };
};

export const drawLine = (start, end, context) => {
	context.moveTo(start.x, start.y);
	context.lineTo(end.x, end.y);
};

export const clearCanvas = (canvasCtx, { width, height}) => {
	canvasCtx.clearRect(0, 0, height, width);
};

export const drawCurve = (
	context,
	start,
	end,
	orientation,
	color,
	width,
	radius,
	radius2
) => {
	if (!radius2) radius2 = radius;
	context.beginPath();
	let anchor;
	if (orientation === "horizontal") {
		anchor = { x: end.x, y: start.y };
	} else {
		anchor = { x: start.x, y: end.y };
	}

	// calculate the point a certain distance along the line
	const m1 = lineDistanceFromEnd(start, anchor, radius);
	const m2 = lineDistanceFromEnd(end, anchor, radius2);

	drawLine(start, m1, context);
	context.bezierCurveTo(m1.x, m1.y, anchor.x, anchor.y, m2.x, m2.y);
	drawLine(m2, end, context);
	context.strokeStyle = color;
	context.lineWidth = width;
	context.lineCap = "square";
	context.stroke();
	context.closePath();
};

export const drawSCurve = (
	context,
	start,
	end,
	color,
	width,
	radius,
	radius2
) => {
	const midpoint = {
		x: (start.x + end.x) / 2,
		y: (start.y + end.y) / 2
	};
	if (!radius2) radius2 = radius;

	drawCurve(
		context,
		start,
		midpoint,
		"horizontal",
		color,
		width,
		radius,
		radius2
	);
	drawCurve(context, midpoint, end, "vertical", color, width, radius2, radius);
};
