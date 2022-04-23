---
layout: prompt
header: answer 4 example
---


This is an example for answer 4. This prompt has no `body:` specified (omitted) so it pulls these contents from `/t/4.md`. 

If `body` was specified as `body: test-answer-4.md` then it would show this page. If there was inline content such as `body: This is the answer for prompt 4` then it would be ignored.

The reason for this setup is so that every answer has a page that can be linked to, [like this](/t/test-answer-4).

Again, note that even though `/t/test-answer-4.md` exists, it wasn't specified so the default `/t/4.md` (/t//{{id}}.md) is shown.



**Markdown Examples:**

---

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

1. this is an
1. ordered
    1. list

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



