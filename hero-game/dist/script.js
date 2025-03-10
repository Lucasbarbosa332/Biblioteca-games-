const tile_size = 48;
const helmet_offset = 12;
const game_size = tile_size * 20;

const root = document.documentElement;
root.style.setProperty("--tile-size", `${tile_size}px`);
root.style.setProperty("--game-size", `${game_size}px`);
root.style.setProperty("--helmet-offset", `${helmet_offset}px`);

// ---

function createBoard() {
	const boardElement = document.getElementById("board");
	const elements = [];

	function createElement(options) {
		// ? item.options | top. options | left.options
		let { item, top, left } = options;

		const currentElement = { item, currentPosition: { top, left } };
		elements.push(currentElement);

		const htmlElement = document.createElement("div");
		htmlElement.className = item;
		htmlElement.style.top = top + "px";
		htmlElement.style.left = left + "px";

		boardElement.appendChild(htmlElement);

		function getNewDirection(buttonPressed, position) {
			switch (buttonPressed) {
				case "ArrowUp":
					return { top: position.top - tile_size, left: position.left };
				case "ArrowRight":
					return { top: position.top, left: position.left + tile_size };
				case "ArrowDown":
					return { top: position.top + tile_size, left: position.left };
				case "ArrowLeft":
					return { top: position.top, left: position.left - tile_size };
				default:
					return { top: position.top, left: position.left };
			}
		}

		function validateMoviment(position, conflictItem) {
			return (
				position.left >= 48 &&
				position.left <= 864 &&
				position.top >= 96 &&
				position.top <= 816 &&
				conflictItem?.item !== "forniture"
			);
		}

		function getMovimentConflict(position, els) {
			const conflictItem = els.find((currentElement) => {
				return (
					currentElement.currentPosition.top === position.top &&
					currentElement.currentPosition.left === position.left
				);
			});

			return conflictItem;
		}

		function validateConflits(cEl, conflictItem) {
			function finishGame(message) {
				setTimeout(() => {
					alert(message);
					history.go(0);
				}, 20);
			}

			if (!conflictItem) {
				return;
			}

			if (cEl.item === "hero") {
				if (conflictItem.item === "mini-demon" || conflictItem.item === "trap") {
					finishGame(" *** Game Over! *** ");
				}

				if (conflictItem.item === "chest") {
					finishGame(" *** Win! *** ");
				}
			}

			if (cEl.item === "mini-demon" && conflictItem.item === "hero") {
				finishGame(" *** Game Over! *** ");
			}
		}

		function move(buttonPressed) {
			const newPosition = getNewDirection(
				buttonPressed,
				currentElement.currentPosition
			);
			const conflictItem = getMovimentConflict(newPosition, elements);
			const isValidMovement = validateMoviment(newPosition, conflictItem);

			if (isValidMovement) {
				currentElement.currentPosition = newPosition;

				htmlElement.style.top = newPosition.top + "px";
				htmlElement.style.left = newPosition.left + "px";

				validateConflits(currentElement, conflictItem);
			}
		}

		return {
			move: move
		};
	}

	function createItem(options) {
		createElement(options);
	}

	function createHero(options) {
		const hero = createElement({
			item: "hero",
			top: options.top,
			left: options.left
		});

		document.addEventListener("keydown", (event) => {
			hero.move(event.key);
		});
	}

	function createEnemy(options) {
		const enemy = createElement({
			item: "mini-demon",
			top: options.top,
			left: options.left
		});

		setInterval(() => {
			const direction = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
			const randomIndex = Math.floor(Math.random() * direction.length);
			const randomDirection = direction[randomIndex];

			enemy.move(randomDirection);
		}, 1000);
	}

	return {
		createItem: createItem,
		createHero: createHero,
		createEnemy: createEnemy
	};
}

const board = createBoard();
// Reminder: item -> mini-deamon | chest | hero | trap
// Reminder: { item: 'item', top: Y(number), left: X(number) }
board.createHero({ top: tile_size * 16, left: tile_size * 2 });
board.createEnemy({ top: tile_size * 15, left: tile_size * 15 });
board.createEnemy({ top: tile_size * 15, left: tile_size * 15 });
board.createEnemy({ top: tile_size * 15, left: tile_size * 15 });
board.createEnemy({ top: tile_size * 15, left: tile_size * 15 });
board.createEnemy({ top: tile_size * 15, left: tile_size * 15 });
board.createEnemy({ top: tile_size * 10, left: tile_size * 10 });
board.createEnemy({ top: tile_size * 10, left: tile_size * 10 });
board.createEnemy({ top: tile_size * 10, left: tile_size * 10 });
board.createEnemy({ top: tile_size * 5, left: tile_size * 10 });
board.createEnemy({ top: tile_size * 5, left: tile_size * 10 });
board.createEnemy({ top: tile_size * 5, left: tile_size * 10 });
board.createEnemy({ top: tile_size * 5, left: tile_size * 10 });
board.createEnemy({ top: tile_size * 4, left: tile_size * 4 });
board.createEnemy({ top: tile_size * 4, left: tile_size * 4 });
board.createEnemy({ top: tile_size * 4, left: tile_size * 4 });
board.createEnemy({ top: tile_size * 4, left: tile_size * 4 });
board.createEnemy({ top: tile_size * 4, left: tile_size * 15 });
board.createEnemy({ top: tile_size * 4, left: tile_size * 15 });
board.createEnemy({ top: tile_size * 4, left: tile_size * 15 });

board.createItem({ item: "chest", top: tile_size * 2, left: tile_size * 18 });
board.createItem({ item: "trap", top: tile_size * 15, left: tile_size * 16 });
board.createItem({ item: "trap", top: tile_size * 10, left: tile_size * 4 });
board.createItem({ item: "trap", top: tile_size * 6, left: tile_size * 8 });
board.createItem({ item: "trap", top: tile_size * 2, left: tile_size * 8 });
board.createItem({ item: "trap", top: tile_size * 5, left: tile_size * 11 });
board.createItem({ item: "trap", top: tile_size * 4, left: tile_size * 13 });

board.createItem({
	item: "forniture",
	top: tile_size * 17,
	left: tile_size * 2
});
board.createItem({
	item: "forniture",
	top: tile_size * 2,
	left: tile_size * 8
});
board.createItem({
	item: "forniture",
	top: tile_size * 2,
	left: tile_size * 16
});
board.createItem({
	item: "forniture",
	top: tile_size * 2,
	left: tile_size * 3
});