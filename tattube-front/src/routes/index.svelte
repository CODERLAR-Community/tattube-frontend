<!--<script context="module">-->
<!--	export const prerender = true;-->
<!--</script>-->

<script>
	import Counter from '$lib/Counter.svelte';
	import { operationStore, query } from '@urql/svelte';

	const videos = operationStore(`
		query {
		  mainPageVideos (limit: 50) {
			id
			videoId
			title
			description
			channel {
			  id
			  channelId
			  name
			  link
			  description
			}
			category {
			  id
			  categoryId
			  name
			  sort
			}
			data
		  }
		}
	  `);
	query($videos);

	const channels = operationStore(`
		query {
          channels {
            id
            channelId
            name
            link
            description
            data
          }
        }
	  `);
	query($channels);


	function getDate(date) {
		let d = new Date(date);
		return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
	}
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
						<h6>Видео</h6>
					</div>
				</div>
				{#if $videos.fetching}
						Загрузка...
				{:else}
					{#each $videos.data.mainPageVideos as video}
						<div class="col-xl-3 col-sm-6 mb-3">
							<div class="video-card">
<!--								{console.log(JSON.parse(video.data))}-->
								<div class="video-card-image" >
									<a class="play-icon" href={`/video/${video.videoId}`}><i class="fas fa-play-circle"></i></a>
									<a href={`/video/${video.videoId}`}><img class="img-fluid" height={`${JSON.parse(video.data).items[0].snippet.thumbnails.high.height}`} src={JSON.parse(video.data).items[0].snippet.thumbnails.medium.url} alt=""></a>
<!--									<div class="time">3:50</div>-->
								</div>
								<div class="video-card-body">
									<div class="video-title">
										<a href={`/video/${video.videoId}`}>{video.title}</a>
									</div>
									<div class="video-page text-success">
									</div>
									<div class="video-view">
										{JSON.parse(video.data).items[0].statistics.viewCount} карау &nbsp;<i class="fas fa-calendar-alt"></i>
										{getDate(JSON.parse(video.data).items[0].snippet.publishedAt)}
									</div>
								</div>
							</div>
						</div>
					{/each}
				{/if}
			</div>
		</div>
		<hr class="mt-0">
		<div class="video-block section-padding">
		{#if $channels.fetching}
				Загрузка...
		{:else}
			<div class="row">
				<div class="col-md-12">
					<div class="main-title">
						<h6>Каналы</h6>
					</div>
				</div>
				{#each $channels.data.channels as channel}
					<div class="col-xl-3 col-sm-6 mb-3">
						<div class="channels-card">
							<div class="channels-card-image">
								<a href={`/channel/${channel.channelId}`}><img class="img-fluid" src="/static/img/s2.png" alt=""></a>
								<!--                                <div class="channels-card-image-btn"><button type="button" class="btn btn-outline-danger btn-sm">Подписаться <strong>1.4M</strong></button></div>-->
							</div>
							<div class="channels-card-body">
								<div class="channels-title">
									<a href={`/channel/${channel.channelId}`}>{channel.name}</a>
								</div>
								<div class="channels-view">
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
		</div>
	</div>
</section>
