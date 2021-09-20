<script>
    import { page } from '$app/stores';
    import Counter from '$lib/Counter.svelte';
    import { operationStore, query } from '@urql/svelte';

    const categories = operationStore(`
		query {
		  categories {
			id
			name
			categoryId
			sort
		  }
		}
	  `);
    query($categories);
</script>
<div>
    <!-- Sidebar -->
    <ul class="sidebar navbar-nav">
        <li class="nav-item active" class:active={$page.path === '/'}>
            <a class="nav-link" sveltekit:prefetch href="/">
                <i class="fas fa-fw fa-home"></i>
                <span>Главная</span>
            </a>
        </li>
        <li class="nav-item" class:active={$page.path === '/channels'}>
            <a class="nav-link" sveltekit:prefetch href="/channels">
                <i class="fas fa-fw fa-users"></i>
                <span>Каналы</span>
            </a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-fw fa-list-alt"></i>
                <span>Категории</span>
            </a>
            <div class="dropdown-menu">
                {#if $categories.fetching}
                    Загрузка...
                {:else}
                    {#each $categories.data.categories as category}
                        <a class="dropdown-item" href={`/category/${category.categoryId}`}>{category.name}</a>
                    {/each}
                {/if}
            </div>
        </li>
    </ul>
</div>
