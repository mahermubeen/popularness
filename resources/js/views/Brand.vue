<template>
  <section class="brand-details">
    <Sidebar></Sidebar>
    <div class="container2">
      <div class="row1">
        <h1>The Popularness Logo</h1>

        <div class="down-wrapper">
          <p>
            The Don Dada…in rare form—and in rare form we mean in EPS and PNG
            file formats
          </p>
          <div class="btns-wrapper">
            <button class="eps-btn">Download EPS</button>
            <button class="png-btn">Download PNG</button>
          </div>
        </div>

        <div class="logo-wrapper">
          <div class="left-box">
            <img src="../../assets/images/logo-orange.png" />
          </div>
          <div class="right-box">
            <img src="../../assets/images/just-logo.png" />
          </div>
        </div>
      </div>
      <div class="row2">
        <h1>Popularness Brand Colors</h1>
        <p class="p1">
          Our primary color is Orange Cream (#FFA472). It’s illy, we know. So
          when you see it, remember where you saw it first.
        </p>
        <div class="colors-wrapper">
          <div class="box">
            <div class="color-span"></div>
            <p>#FFA472</p>
          </div>
          <div class="box">
            <div class="color-span"></div>
            <p>#000000</p>
          </div>
          <div class="box">
            <div class="color-span"></div>
            <p>#353535</p>
          </div>
          <div class="box">
            <div class="color-span"></div>
            <p>#e5e5e5</p>
          </div>
          <div class="box">
            <div class="color-span"></div>
            <p>#ffffff</p>
          </div>
        </div>
      </div>
      <div class="row3">
        <h1>Popularness Usage Guidelines</h1>
        <p>
          We promise we’re not trying to be team petty, but yeah we have to lay
          a few ground rules down when it comes to using our brand assets. We
          ask that you please:
        </p>
        <div class="points-wrapper">
          <p>
            • Always use the mascot and logotype together, or just the mascot.
            Don’t use the logotype on its own.
          </p>
          <p>
            • Don’t use colors in the logo that aren’t included in our brand
            colors (see above).
          </p>
          <p>
            • Give the logo adequate negative space — don’t clutter it with
            other text or graphics.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from "./../layouts/components/Sidebar1";

export default {
  components: {
    Sidebar,
  },
};
</script>
