<script context="module">
    export async function load({ context, page }) {
        let slug = page.params.slug;
        return {
            props: {
                id: slug,
            }
        };
    }
</script>
<script>
    import Counter from '$lib/Counter.svelte';
    import { operationStore, query } from '@urql/svelte';

    export let id;

    console.log(location.href);

    const videos = operationStore(`
		query {
		  mainPageVideos (limit: 10) {
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

    const video = operationStore(`
		query ($videoId: ID!){
		  video (videoId: $videoId) {
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
	  `, { videoId: id });
    query($video);
    let videoData;
    function getDate(date) {
        let d = new Date(date);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    }
</script>

<div class="container-fluid pb-0">
    <div class="video-block section-padding">
        <div class="row">
            <div class="col-md-8">
                {#if $video.fetching}
                    Загрузка...
                {:else}
<!--                    {console.log($video.data.video)}-->
<!--                    {console.log(JSON.parse($video.data.video.data))}-->
                    <div class="single-video-left">
                        <div class="single-video">
                            <iframe width="100%" height="500" src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                        </div>
                        <div class="single-video-title box mb-3">
                            <h2><a>{$video.data.video.title}.</a></h2>
                            <p class="mb-0"><i class="fas fa-eye"></i> {JSON.parse($video.data.video.data).items[0].statistics.viewCount} просмотров</p>
                            <small>{getDate(JSON.parse($video.data.video.data).items[0].snippet.publishedAt)}</small>
                        </div>
                        <div class="single-video-author box mb-3">
<!--                            <div class="float-right"><button class="btn btn-danger" type="button">Подписаться <strong>1.4M</strong></button> <button class="btn btn btn-outline-danger" type="button"><i class="fas fa-bell"></i></button></div>-->
                            <img class="img-fluid" src="/static/img/s4.png" alt="">
                            <p><a href={`/channel/${$video.data.video.channel?.channelId}`}><strong>{$video.data.video.channel?.name}</strong></a> <span title="" data-placement="top" data-toggle="tooltip" data-original-title="Verified"><i class="fas fa-check-circle text-success"></i></span></p>
                            <small>{$video.data.video.channel?.description}</small>
                        </div>
                        {#if $video.data.video.description}
                            <div class="single-video-info-content box mb-3">
                                <p>{$video.data.video.description}</p>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
            <div class="col-md-4">
                <div class="single-video-right">
                    <div class="row">
<!--                        <div class="col-md-12">-->
<!--                            <div class="adblock">-->
<!--                                <div class="img">-->
<!--                                    Google AdSense<br>-->
<!--                                    336 x 280-->
<!--                                </div>-->
<!--                            </div>-->
<!--                        </div>-->
                        <div class="col-md-12">
                            {#if $videos.fetching}
                                Загрузка...
                            {:else}
                                {#each $videos.data.mainPageVideos as videoSug}
                                    {#if id !== videoSug.videoId}
                                        <div class="video-card video-card-list">
                                            <div class="video-card-image">
                                                <a class="play-icon" href={`/video/${videoSug.videoId}`}><i class="fas fa-play-circle"></i></a>
                                                <a href={`/video/${videoSug.videoId}`}><img class="img-fluid" src={JSON.parse(videoSug.data).items[0].snippet.thumbnails.medium.url} alt=""></a>
                                                <!--                                            <div class="time">3:50</div>-->
                                            </div>
                                            <div class="video-card-body">
                                                <div class="video-title">
                                                    <a href={`/video/${videoSug.videoId}`}>{videoSug.title}</a>
                                                </div>
                                                <div class="video-page text-success">
                                                </div>
                                                <div class="video-view">
                                                    {JSON.parse(videoSug.data).items[0].statistics.viewCount} карау &nbsp;<i class="fas fa-calendar-alt"></i> {getDate(JSON.parse(videoSug.data).items[0].snippet.publishedAt)}
                                                </div>
                                            </div>
                                        </div>
                                    {/if}
                                {/each}
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
