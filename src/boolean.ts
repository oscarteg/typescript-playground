type Player = {
	name: string;
};

declare function useState<T>(initialValue?: T): [T, (value: T) => void];

const [player, setPlayer] = useState();

declare function VideoPlayer(player: Player): void;

player != null ? VideoPlayer(player) : console.log("asdsa");
player ?? VideoPlayer(player);
// ^?

if (player !== null) {
	VideoPlayer(player);
}
