# Russian Travel

[![project](https://svgshare.com/i/pvA.svg "github profile")](https://kobewinona.github.io/mesto/)

| [![github profile](https://svgshare.com/i/p5A.svg "github profile")](https://github.com/kobewinona) | &copy; dima klimkin |
| :---: | :---: |

| html | css | js |vscode | git | bem |
| :---: | :---: | :---: |:---: | :---: | :---: |
| [![html](https://svgshare.com/i/p7U.svg)](https://www.w3.org/html/) | [![css](https://svgshare.com/i/p6o.svg)](https://www.w3schools.com/css/) | [![javascript](https://svgshare.com/i/pvW.svg)](https://www.javascript.com/) | [![vs code](https://svgshare.com/i/p5n.svg)](https://code.visualstudio.com/) | [![git](https://svgshare.com/i/p6d.svg)](https://git-scm.com/) | [![bem](https://svgshare.com/i/p6x.svg)](https://en.bem.info/) |

---

## about this project

This project is the first one of mine using javascript.

The webpage itself is about places in Russia. It allows to change profile name and job, upload new pictures of different places and git it a like ♡.

---

## CSS syntax decoration I used in this project

To make the code more readable for me I decided to devide rules by their function:

```css
.header__title {
  width: 730px;

  font-size: 102px;
  font-weight: 600;
  line-height: 96px;

  position: relative;
  margin: 0 0 0 64px;

  z-index: 2;
}
```

### **1st** block of lines describes an object in generall:

```css
dev {
  width: 0;
  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
}
```
>etc.

### **2nd** block of lines describes text and its decoration:

```css
dev {
  color: #fff;
  font-size: 14px;
  font-weight: normal;
  text-align: center;
}
```
>etc.

### **3rd** block of lines describes an object's content layout:

```css
dev {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  column-gap: 0;
}
```
>etc.

### **4th** block of lines describes an object's position and size:

- *rules' order goes from the furthest* ❏ *to the closest* ■ *to content*

- *rules with sides*  *go from top to the left* ↻

```css
dev {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  border: none;
  padding: 0;
}
```
![position](https://i.postimg.cc/HkN8sKfB/element.png)

### **5th** block of lines is just ```z-index``` ☺.

Inside those made-up blocks of lines I also try to maintain a certain order but sometimes I fail and it's not like anyone will ever see this anyway)

---

## styling of this project
*This is here just so I could add those cool bubbles with colors.*

**font**

```css
font-family: 'Inter', Tahoma, sans-serif;
```

**colors**

| black (background) | white (text) |
| :---: | :---: |
| color: #000 | color: #fff |

---

## difficulties during this project

**1 problem**

The profile name on mobile devices should be centered in width according to the design template and the edit button should be right next to it which was difficult to accomplish maintaining flexability between different resolutions.

![template](https://i.postimg.cc/N040T6cC/2023-01-30-22-36-38.png)
*so it is almost centered in width in the design template* ☺

I chose to use ```grid``` for this element and in order for the first column to be centered I just set it to ```100%``` in width making the second column kind of overflow the presumed space for the grid wich I limited in ```max-width``` so it wouldn't go out of screen width:

```css
.profile__container {
  max-width: calc(100% - 60px);

  display: grid;
  grid-template-columns: 100% 1fr;
  gap: 8px 4px;
  align-items: baseline;

  flex-basis: 66%;

  margin: 26px 0 0 0;
}
```

![release](https://i.postimg.cc/fLRRvVWz/2023-01-30-22-40-45.png)
*looks fine and does not break beetwen any resolutions*

**solution**

>specifying ```font-size``` to 0 helps:
```css
.lead__image-container {
  width: 100%;
  font-size: 0;

  position: relative;

  margin: 40px auto 0 auto;
}
```

**2 problem**

I wanted to make a popup window to appear smoothly. I liked a way to do that using ```visibility``` property since this way an element still exists in the DOM and it's possible to tweek its behaviour with animations or transitions, but since the task for this project was using ```display``` property specifically I had to think of something, because once an element is not displayed you cannot work with it.

**solution**

>I chose to set animations with a ```setTimeout``` method for closing popup window so it can play animations before disappearing from the DOM:

```javascript
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

function handlePopup(event) {
  if (popup.classList.contains('popup_opened')) {
    if (event.target === event.currentTarget) {
      popup.style.animation = 'fadeOut ease-out .2s';
      popupContainer.style.animation = 'scaleDown ease-out .2s';

      setTimeout(togglePopup, 200);
    }
  } else {
    popup.style.animation = 'fadeIn ease-in .2s';
    popupContainer.style.animation = 'scaleUp ease-in .2s';

    togglePopup();
  }
}
```

---

| thanks to yandex practicum team | [![yandex praktikum](https://svgshare.com/i/p77.svg)](https://practicum.yandex.ru/) | ♥ |
| :---: | :---: | :---: |
