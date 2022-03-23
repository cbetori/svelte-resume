<script>
	export let job;
	let dropDownState = false;
</script>

<div class="wrapper">
	<div
		class="hover:bg-fuchsia-500 flex justify-between items-center mb-4 rounded-lg p-2"
		on:click={() => (dropDownState = !dropDownState)}
	>
		<strong>{job.company}</strong>
		<div style="font-size: .75rem">&#9660</div>
	</div>
	<div class={dropDownState ? 'dropdownOpen' : 'dropdownOpen open'}>
		<i>{job.descrip}</i>
		<div>{job.jobDescrip}</div>
	</div>
</div>

<style>
	.wrapper {
		width: 25%;
	}
	.dropdownOpen {
		height: 100px;
		box-shadow: inset;
		transition: all 0.5s ease-out;
	}
	.dropdownOpen.open {
		height: 0px;
		overflow: hidden;
		transition: all 0.5s ease-out;
	}
</style>
