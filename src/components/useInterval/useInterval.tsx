import { useEffect, useRef } from "react";

type IntervalProps = {
  callback: () => void;
  delay: number | null;
};

const useInterval = ({ callback, delay }: IntervalProps) => {
  const savedCallback = useRef<() => void>();
	
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback])

	useEffect(() => {
		if (delay !== null) {
			const trigger = () => {
				if (savedCallback.current) {
					savedCallback.current();
				}
			};

			const id = setInterval(trigger, delay);
			return () => clearInterval(id);
		}
	}, [delay])
}

export default useInterval;