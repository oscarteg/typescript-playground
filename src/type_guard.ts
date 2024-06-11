type Fish = {
	swim: () => void;
};

type Bird = {
	fly: () => void;
};

function isFish(pet: Fish | Bird): pet is Fish {
	return "swim" in pet;
}

// Type guard -> Narrow and union
function foo(pet: Bird | Fish): void {
	if (isFish(pet)) {
		pet.swim();
	} else {
		pet.fly();
	}
}
