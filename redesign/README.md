# Redesign options

Eight standalone design directions for tretasharma.com. Each one is a single HTML file with inline CSS, so nothing needs to be built.

## Preview locally

From the repository root:

```bash
python -m http.server 4517 --directory redesign
```

Then open http://localhost:4517. The landing page links to all eight versions.

## The eight versions

| # | Folder | Direction | Inspired by |
|---|--------|-----------|-------------|
| 1 | `1-studio/` | Studio: a confident learning-design portfolio | amandalxd.com, sabrinaglxd.com |
| 2 | `2-index/` | Index: a researcher's side-by-side column home page | andymatuschak.org |
| 3 | `3-editorial/` | Editorial: warm dark theme, essays as illustrated cards | maggieappleton.com |
| 4 | `4-explorable/` | Explorable: the site is a short interactive lesson | ncase.me, beth-myers.com |
| 5 | `paper/1-notebook/` | The Notebook: a teacher's dot-grid notebook | |
| 6 | `paper/2-gazette/` | The Gazette: a newsprint broadsheet | |
| 7 | `paper/3-cutpaper/` | Cut Paper: a construction-paper collage | |
| 8 | `paper/4-letter/` | A Letter: letterpress stationery | |

## Notes

- Every fact and number comes from the résumé, the current site or the Medium essays. `shared/CONTENT.md` lists the verified facts and their sources.
- Lines written in Treta's voice are drafts for her to edit.
- Older project write-ups in `_projects/` contain placeholder details, and the `project-*.jpg` images are stock photos, so the redesigns don't use them.
- Once a direction is chosen, it can be ported into the Jekyll layouts and this folder removed.
