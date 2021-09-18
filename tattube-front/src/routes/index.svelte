<!--<script context="module">-->
<!--	export const prerender = true;-->
<!--</script>-->

<script>
	import Counter from '$lib/Counter.svelte';
	import { operationStore, query } from '@urql/svelte';
</script>

<svelte:head>
	<title>TatTube</title>
</svelte:head>

<section>
	<div class="container-fluid pb-0">
		<div class="video-block section-padding">
			<div class="row">
				<div class="col-md-12">
					<div class="main-title">
<!--						<div class="btn-group float-right right-action">-->
<!--							<a href="#" class="right-action-link text-gray" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
<!--								Sort by <i class="fa fa-caret-down" aria-hidden="true"></i>-->
<!--							</a>-->
<!--							<div class="dropdown-menu dropdown-menu-right">-->
<!--								<a class="dropdown-item" href="#"><i class="fas fa-fw fa-star"></i> &nbsp; Top Rated</a>-->
<!--								<a class="dropdown-item" href="#"><i class="fas fa-fw fa-signal"></i> &nbsp; Viewed</a>-->
<!--								<a class="dropdown-item" href="#"><i class="fas fa-fw fa-times-circle"></i> &nbsp; Close</a>-->
<!--							</div>-->
<!--						</div>-->
						<h6>Видео</h6>
					</div>
				</div>
				<div class="col-xl-3 col-sm-6 mb-3">
					<div class="video-card">
						<div class="video-card-image">
							<a class="play-icon" href="/video/1"><i class="fas fa-play-circle"></i></a>
							<a href="/video/1"><img class="img-fluid" src="/static/img/v1.png" alt=""></a>
							<div class="time">3:50</div>
						</div>
						<div class="video-card-body">
							<div class="video-title">
								<a href="/video/1">There are many variations of passages of Lorem</a>
							</div>
							<div class="video-page text-success">
							</div>
							<div class="video-view">
								1.8M просмотров &nbsp;<i class="fas fa-calendar-alt"></i> 11 месяцев назад
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<hr class="mt-0">
		<div class="video-block section-padding">
			<div class="row">
				<div class="col-md-12">
					<div class="main-title">
						<h6>Каналы</h6>
					</div>
				</div>
				<div class="col-xl-3 col-sm-6 mb-3">
					<div class="channels-card">
						<div class="channels-card-image">
							<a href="#"><img class="img-fluid" src="/static/img/s1.png" alt=""></a>
							<div class="channels-card-image-btn"><button type="button" class="btn btn-outline-danger btn-sm">Подписаться <strong>1.4M</strong></button></div>
						</div>
						<div class="channels-card-body">
							<div class="channels-title">
								<a href="#">Название канала</a>
							</div>
							<div class="channels-view">
							</div>
						</div>
					</div>
				</div>
				<div class="col-xl-3 col-sm-6 mb-3">
					<div class="channels-card">
						<div class="channels-card-image">
							<a href="#"><img class="img-fluid" src="/static/img/s2.png" alt=""></a>
							<div class="channels-card-image-btn"><button type="button" class="btn btn-outline-danger btn-sm">Подписаться <strong>1.4M</strong></button></div>
						</div>
						<div class="channels-card-body">
							<div class="channels-title">
								<a href="#">Название канала</a>
							</div>
							<div class="channels-view">
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
