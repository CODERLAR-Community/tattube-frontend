<script>
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
</script>

<header>
	<nav class="navbar navbar-expand navbar-light bg-white static-top osahan-nav sticky-top" style="position: fixed; width: 100%; min-height: 53px">
		&nbsp;&nbsp;
		<button class="btn btn-link btn-sm text-secondary order-1 order-sm-0" id="sidebarToggle">
			<i class="fas fa-bars"></i>
		</button> &nbsp;&nbsp;
		<a class="navbar-brand ml-5" style="font-weight: bold" href="/"><img class="img-fluid" alt="" src="">
			<span style="color: #54a833">Tat</span><span style="color: #2a2e2a;">Tube</span>
		</a>
		<!-- Navbar Search -->
		<form class="d-none d-md-inline-block form-inline ml-5 mr-md-5 my-2 my-md-0 osahan-navbar-search">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="Поиск...">
				<div class="input-group-append">
					<button class="btn btn-light" type="button">
						<i class="fas fa-search"></i>
					</button>
				</div>
			</div>
		</form>
	</nav>
</header>
