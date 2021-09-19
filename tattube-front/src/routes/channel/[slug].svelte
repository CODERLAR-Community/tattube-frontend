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

    const channel = operationStore(`
		query ($channelId: ID!){
          channel (channelId: $channelId) {
            id
            channelId
            name
            link
            description
            data
            videoSet {
              id
              title
              videoId
              link
              data
            }
          }
        }
	  `, { channelId: id });
    query($channel);

    function getDate(date) {
        let d = new Date(date);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    }
</script>

<div class="single-channel-page" id="content-wrapper">
    {#if $channel.fetching}
        <div class="col-xl-3 col-sm-6 mb-3">
            Загрузка...
        </div>
    {:else}
<!--        {console.log($channel.data.channel)}-->
<!--        {console.log(JSON.parse($channel.data.channel.data))}-->
        <div class="single-channel-image">
            <img class="img-fluid" alt="" src="/static/img/channel-banner.png">
            <div class="channel-profile">
                <img class="channel-profile-img" alt="" src={JSON.parse($channel.data.channel.data).items[0].snippet.thumbnails.medium.url}>
<!--                <div class="social hidden-xs">-->
<!--                    Соц сети &nbsp;-->
<!--                    <a class="fb" href="#">Facebook</a>-->
<!--                    <a class="tw" href="#">Twitter</a>-->
<!--                    <a class="gp" href="#">Google</a>-->
<!--                </div>-->
            </div>
        </div>
        <div class="single-channel-nav">
            <nav class="navbar navbar-expand-lg navbar-light">
                <a class="channel-brand" href="#">
                        {$channel.data.channel.name}
<!--                    <span title="" data-placement="top" data-toggle="tooltip" data-original-title="Verified">-->
<!--                        <i class="fas fa-check-circle text-success"></i>-->
<!--                    </span>-->
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active" style="height: 50px">
<!--                            <a class="nav-link" href="#">Videos <span class="sr-only">(current)</span></a>-->
                        </li>
                    </ul>
                    <!--                <form class="form-inline my-2 my-lg-0">-->
                    <!--                    <input class="form-control form-control-sm mr-sm-1" type="search" placeholder="Search" aria-label="Search">-->
                    <!--                    <button class="btn btn-outline-success btn-sm my-2 my-sm-0" type="submit">-->
                    <!--                        <i class="fas fa-search"></i>-->
                    <!--                    </button> &nbsp;&nbsp;&nbsp;-->
                    <!--                </form>-->
                    <!--                <button class="btn btn-outline-danger btn-sm" type="button">-->
                    <!--                    Subscribe <strong>1.4M</strong>-->
                    <!--                </button>-->
                </div>
            </nav>
        </div>
        <div class="container-fluid">
            <div class="video-block section-padding">
                <div class="row">
                    <div class="col-md-12">
                        <div class="main-title">
                            <h6>Видео</h6>
                        </div>
                    </div>
                    {#each $channel.data.channel.videoSet as video}
                        <div class="col-xl-3 col-sm-6 mb-3">
                            <div class="video-card">
                                <div class="video-card-image">
                                    <a class="play-icon" href={`/video/${video.videoId}`}><i class="fas fa-play-circle"></i></a>
                                    <a href={`/video/${video.videoId}`}><img class="img-fluid" src={JSON.parse(video.data).items[0].snippet.thumbnails.medium.url} alt=""></a>
<!--                                    <div class="time">3:50</div>-->
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
                </div>
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center pagination-sm mb-0">
                        <li class="page-item disabled">
                            <a tabindex="-1" href="#" class="page-link">Previous</a>
                        </li>
                        <li class="page-item active"><a href="#" class="page-link">1</a></li>
                        <li class="page-item"><a href="#" class="page-link">2</a></li>
                        <li class="page-item"><a href="#" class="page-link">3</a></li>
                        <li class="page-item">
                            <a href="#" class="page-link">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    {/if}
</div>
