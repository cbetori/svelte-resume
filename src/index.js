import App from './routes/index.svelte';

const app = (props) => {
	return new App({
		props: { ...props },
		target: document.body
	});
};

export default app();
