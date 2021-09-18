<script>
    import Header from '$lib/header/Header.svelte';
    import SideBar from '$lib/sideBar/SideBar.svelte';
    import Footer from '$lib/footer/Footer.svelte';
</script>

<div style="display: flex; justify-content: center">
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-8 mx-auto text-center  pt-4 pb-5">
                <h1>
<!--                    <img alt="404" src="/static/img/404.png" class="img-fluid">-->
                    Ошибка 404
                </h1>
                <h1>Страница не найдена.</h1>
                <p class="land">К сожалению страница, которую вы ищите, не существует.</p>
                <div class="mt-5">
                    <a class="btn btn-outline-primary" href="/"><i class="mdi mdi-home"></i> Вернуться на главную</a>
                </div>
            </div>
        </div>
    </div>
</div>
