# Safari iOS `<iframe>` height fix

Safari for iOS doesn't follow the standards. Neither do `UIWbeView` or `WKWebView` for that matter.

You can't for example set the `height` of an `<iframe>` which is something that works on **every browser on earth**, even old versions of IE. Safari for iOS simply decides the height depending on the content of the `<iframe>` and shows you the finger.

So today I had to solve this since I needed to show some content in an `<iframe>` on a Phonegap app.

### Simple (naive) solution

A simple solution (which you can find all over the web) is to put your `<iframe>` in a `<div>` and use the following CSS:
```css
#iframe-container {
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
	width: 500px;
	height:500px;
}
```
So now you have a `<div>` which you can scroll with *momentum* and all, but **the height of the `<iframe>` hasn't really changed**. The complete `<iframe>` is hidden inside the div.

The problem with this is that you can't center UI elements on the screen like modals, or use `position:fixed;`for say a top menu bar. Remember that the `<iframe>` itself never scrolls, you are scrolling the container. This means a fixed element will remain fixed inside the `<iframe>` but not the container which is what you are scrolling.

You may think that you should be able to solve this using Javascript but you can't. Again, you can't know the position of the scroll since the `<iframe>` never scrolls. This means you have no way of positioning your UI elements depending on the scroll position. There is no way of knowing where the center or top positions are (relatively speaking).

### Solution

After messing with this for a few hours the solution for my case was to to wrap all the content of the `<iframe>` and use this CSS on the wrapper:
```css
#wrap {
	position: fixed;
	top: 0;
	right:0;
	bottom:0;
	left: 0;
	overflow-y: scroll;
  	-webkit-overflow-scrolling: touch;
}
```

This way you can set the dimensions of the `<iframe>` since Safari will believe the content has no dimensions. Now `position:fixed;` and `position:absolute;` will work as expected. I have not fiddled much with Javascript on this particular problem, but it should be easy to get real coordinates.

The downside of this approach is that you need to be able to control the HTML that is loaded in the `<iframe>`.

[You can see the quick and dirty demo here.](http://www.pierbover.com/pub/safari-iframe-fix/)

Tap on the `lorem ipsum` text to show an overlay that works as expected and occupies the whole viewport. There's a small white square that proves where the overlay ends. As a bonus the code also shows how to block scroll on the underlying content while the overlay is shown.

<img src="proof.png" width="400"/>

So now you can show Safari the finger.

# 🖕
