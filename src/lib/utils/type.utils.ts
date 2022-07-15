export type InputChangeEvent = (
	e: Event & {
		currentTarget: EventTarget & HTMLInputElement;
	}
) => void;
