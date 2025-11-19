// Fetch public repositories for the user and render them
document.addEventListener('DOMContentLoaded', ()=>{
  const container = document.getElementById('repos');
  if(!container) return;

  const username = 'BahramMuzaffarli';
  const api = `https://api.github.com/users/${username}/repos?per_page=12&sort=updated`;

  fetch(api)
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(repos => {
      if(!Array.isArray(repos) || repos.length === 0){
        container.innerHTML = '<p style="grid-column:1/-1;color:var(--muted)">No public repositories found.</p>';
        return;
      }

      const cards = repos.map(r => {
        const desc = r.description ? r.description : '';
        const lang = r.language ? r.language : '';
        const stars = r.stargazers_count || 0;
        return `
          <article class="repo">
            <h3><a href="${r.html_url}" target="_blank" rel="noopener">${r.name}</a></h3>
            <p>${desc}</p>
            <div class="repo-meta">
              <span>★ ${stars}</span>
              <span>${lang}</span>
              <span>Updated ${new Date(r.updated_at).toLocaleDateString()}</span>
            </div>
          </article>
        `;
      }).join('');

      container.innerHTML = cards;
    })
    .catch(err => {
      console.error('Failed to fetch repos', err);
      container.innerHTML = '<p style="grid-column:1/-1;color:var(--muted)">Unable to load GitHub repositories at the moment.</p>';
    });
});
