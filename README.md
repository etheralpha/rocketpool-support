# rocketpool-support

This is the repo for <https://rocketpool.support>, a Rocket Pool troubleshooting self-help resource.


## Local Development

1. Clone the repo (or fork the repo to your account)
1. Install dependencies: `bundle install`
1. Create a feature branch off of the `dev` branch
1. Start the local server: `bundle exec jekyll serve`
1. Go to <http://localhost:4400/> to view changes

To build the site use `bundle exec jekyll build`.

Resources:

- [Jekyll Docs](https://jekyllrb.com/docs/)
- [Liquid Syntax](https://shopify.github.io/liquid/basics/introduction/)


## Updating Troubleshooting Prompts

Go to `_data/troubleshooting-prompts.yml` and add an entry using the following template:

```
- id: 
  type: 
  title: 
  body: 
  options: 
    - option: 
      go_to_id: 
    - option: 
      go_to_id: 
```

key       | description 
----------|------------
id        | A permanent, unique number that will be used to reference this entry.
type      | (question/answer) `question` = an entry with choices to progress; `answer` = an entry that's a dead end with no choices for progression an only has a solution;
title     | The question or the answer header.
body      | (See [Body Content](#body-content))
options   | A list of options for the user to get directed to the next prompt.
option    | The option text.
go_to_id  | The `id` of the prompt this option jumps to.

Make sure to update the `last_number_used` entry at the top of the page to keep track of the last (highest) number `id` used to know what `id` (number) to start new entries on.

**Note:** The prompt will start at the entry with `id: 1`.


### Body Content

#### Question Body Content

The `body:` field for questions are used to provide additional comments to the question `title`.

For question `body:` content there's 3 options:

1. Leave it blank if there's no additional comments to add to the question `title`.
1. Create inline content such as this: `body: This is inline body content`.
1. Create a content markdown file in the `/q/` folder.

To create a content file:
1. Create a markdown file within the `/q/` directory, for this example let's use `/q/1.md` for the first prompt (`id: 1`).
1. Add a file reference to the prompt's entry, such as `body: 1.md`.
1. At the top of your markdown content to the file add the following:
    ```
    ---
    layout: prompt
    ---
    ```
1. Under that add your markdown content to the file.


#### Answer Body Content

The `body:` field for answers are used to provide troubleshooting solutions.

For answer `body:` content there's 2 options:

1. Create a content markdown file in the `/t/` folder named after the prompt `id`, e.g. `/t/4.md`.
1. Create a content markdown file in the `/t/` folder with a specified name, such as `/t/prompt-4-answer.md`. 

**Note:** Inline content will not show for answers. The reason for this setup is so that every answer has a page that can be linked to.

To create a content file:
1. Create a markdown file within the `/t/` directory, for this example let's use `/t/prompt-4-answer.md` for an aswer to prompt (`id: 4`).
1. Add a file reference to the prompt's entry, such as `body: prompt-4-answer.md`. If your file is named after the prompt `id`, e.g. `/t/4.md` then you can omit this step as it'll automatically look for a file with that name by default.
1. At the top of your markdown content to the file add the following:
    ```
    ---
    layout: prompt
    header: Insert your desired page header here
    ---
    ```
1. Under that add your markdown content to the file.


---


## Markdown Examples

# H1

## H2

### H3

#### H4

##### H5

###### H6

[link](/t/test/)

**bold text**

*italic text*

__*bold and italic text*__

`inline code`

```
code block
```

- this is an
- unordered
    - list

1. this is an:
    ```
    ordered list
    ```
1. continued after code block

header 1      | header 2
--------------|--------------
row 1, cell 1 | row 1, cell 2
row 2, cell 1 | row 2, cell 2
row 3, cell 1 | row 3, cell 2

<details markdown="1">
  <summary>Expandable content (click me)</summary>
  Peek a boo!

  - I
    - see
      - you
</details>

![](/assets/img/logo.png)

{:class="caption"}
this is a caption

