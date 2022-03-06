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


## Updating troubleshooting prompts

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
body      | Question details or an answer's solution.
options   | A list of options for the user to get directed to the next prompt.
option    | The option text.
go_to_id  | The `id` of the prompt this option jumps to.

Make sure to update the `last_number_used` entry at the top of the page to keep track of the last (highest) number `id` used to know what `id` (number) to start new entries on.

**Note:** The prompt will start at the entry with `id: 1`.

