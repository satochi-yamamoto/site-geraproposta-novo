import { useState, useEffect } from 'react';

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

function generateId() {
	count = (count + 1) % Number.MAX_VALUE;
	return count.toString();
}

const toastStore = {
	state: {
		toasts: [],
	},
	listeners: [],
	
	getState: () => toastStore.state,
	
	setState: (nextState) => {
		if (typeof nextState === 'function') {
			toastStore.state = nextState(toastStore.state);
		} else {
			toastStore.state = { ...toastStore.state, ...nextState };
		}
		
		toastStore.listeners.forEach(listener => listener(toastStore.state));
	},
	
	subscribe: (listener) => {
		toastStore.listeners.push(listener);
		return () => {
			toastStore.listeners = toastStore.listeners.filter(l => l !== listener);
		};
	}
};

export const toast = ({ ...props }) => {
	const id = generateId();

	const update = (props) =>
		toastStore.setState((state) => ({
			...state,
			toasts: state.toasts.map((t) =>
				t.id === id ? { ...t, ...props } : t
			),
		}));

	const dismiss = () => toastStore.setState((state) => ({
		...state,
		toasts: state.toasts.filter((t) => t.id !== id),
	}));

	toastStore.setState((state) => ({
		...state,
		toasts: [
			...state.toasts,
			{
				...props,
				id,
				open: true,
				onOpenChange: (open) => {
					if (!open) dismiss();
				},
			},
		].slice(-TOAST_LIMIT),
	}));

	return {
		id: id,
		dismiss,
		update,
	};
};

export function useToast() {
	const [state, setState] = useState(toastStore.getState());

	useEffect(() => {
		return toastStore.subscribe(setState);
	}, [setState]);

	return {
		...state,
		toast,
		dismiss: (toastId) => {
			toastStore.setState((state) => ({
				...state,
				toasts: state.toasts.filter((t) => t.id !== toastId),
			}));
		},
	};
}
