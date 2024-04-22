<script context="module">
    export async function load({ context, page }) {
        let slug = page.params.slug;
        return {
            props: {
                categoryId: slug,
            }
        };
    }
</script>
<script>
    import Counter from '$lib/Counter.svelte';
    import { operationStore, query } from '@urql/svelte';

    export let categoryId;
    console.log(categoryId);
    const videos = operationStore(`
		query ($categoryId: ID){
		  videos (categoryId: $categoryId, limit: 500) {
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
	  `, {categoryId});
    query($videos);

    const channels = operationStore(`
		query ($search: String){
          channels (search: $search, limit: 500){
            id
            channelId
            name
            link
            description
            data
          }
        }
	  `, {categoryId});
    query($channels);


    function getDate(date) {
        let d = new Date(date);
        return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`
    }
</script>

<div class="container-fluid pb-0">
    <div class="video-block section-padding">
        {#if $videos.fetching}
            <div class="col-xl-3 col-sm-6 mb-3">
                Загрузка...
            </div>
        {:else}
            <div class="row">
                <div class="col-md-12">
                    <div class="main-title">
                        <h6>Видео</h6>
                    </div>
                </div>
                {#if $videos.data.videos}
<!--                    {console.log($videos.data.videos)}-->
                    {#if $videos.data.videos.length === 0}
                        Видео по вашему запросу не найдено(
                    {:else}
                        {#each $videos.data.videos as video}
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
                {:else}
                    <div class="col-xl-3 col-sm-6 mb-3">
                        Видео по вашему запросу не найдено(
                    </div>
                {/if}
            </div>
        {/if}
<!--        <nav aria-label="Page navigation example">-->
<!--            <ul class="pagination justify-content-center pagination-sm mb-4">-->
<!--                <li class="page-item disabled">-->
<!--                    <a class="page-link" href="" tabindex="-1">Previous</a>-->
<!--                </li>-->
<!--                <li class="page-item active"><a class="page-link" href="#">1</a></li>-->
<!--                <li class="page-item"><a class="page-link" href="#">2</a></li>-->
<!--                <li class="page-item"><a class="page-link" href="#">3</a></li>-->
<!--                <li class="page-item">-->
<!--                    <a class="page-link" href="#">Next</a>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </nav>-->
    </div>
</div>
