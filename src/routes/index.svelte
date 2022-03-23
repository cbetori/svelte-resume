<script>
	export let test;
	export let style;
	console.log(style);
	import '../resume.css';
	import Job from '../components/Job.svelte';
	import SectionHeader from '../components/SectionHeader.svelte';
	const jobs = [
		{
			company: 'PMG',
			descrip: 'Marketing Agency',
			jobDescrip: 'Created marketing automation tools',
			stack: [
				{
					language: 'Javascript',
					libraries: ['React']
				}
			]
		}
	];
</script>

<div class="test" {style}>
	<div class="another">
		<h1>Collin Betori</h1>
		{test}
		<SectionHeader title="Work Experience" />
		{#each jobs as job}
			<Job {job} />
		{/each}
		<SectionHeader title="Education" />
	</div>
</div>

<style>
	:global(html) {
		height: 100%;
		margin: 0;
	}
	:global(body) {
		height: 100%;
		margin: 0;
	}
	.test {
		/* height: 100vh; */
		display: flex;
		flex-direction: column;
		height: 100%;
		background-color: #1b1e32;
		color: whitesmoke;
		padding-left: clamp(50px, 15vw, 500px);
		padding-right: clamp(50px, 15vw, 500px);
		padding-top: clamp(50px, 10vw, 500px);
		padding-bottom: clamp(50px, 10vw, 500px);
	}
	.another {
		flex: 1 1 auto;
	}
</style>
