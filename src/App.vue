<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "./scss/_variables.scss";
@import "~bootstrap/scss/bootstrap";

@mixin basic-button {
  border-width: 2.2px;
  font-size: 1.2em;
  padding-left: 1.2em;
  padding-right: 1.2em;
  min-height: 1.8em;
  font-weight: bold;
  cursor: pointer;
}

@mixin disabled {
  background: rgb(199, 199, 199);
  border-color: rgb(199, 199, 199);
}

.button {
  @include basic-button;
  // @include button-blue;
  align-self: center;
}
.disabled {
  @include disabled;
}

.important {
  color: $molit-danger;
}
.font-family {
  font-family: Helvetica;
}

.base-color {
  color: white;
}

@mixin basic-card {
  // border-radius: 20px;
  border: 0;
  cursor: pointer;
}

.card {
  @include basic-card;
}

.flex-center {
  display: flex;
  justify-content: center;
}

.flex-space-between {
  display: flex;
  justify-content: space-between;
}

.flex-space-around {
  display: flex;
  justify-content: space-around;
}

.flex-left {
  display: flex;
  justify-content: flex-start;
}

.flex-right {
  display: flex;
  justify-content: flex-end;
}

.center-vertical {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden {
  visibility: hidden;
}

.option-card {
  margin-top: 3px;
}

.card-basic-margins-paddings {
  margin: 10px 0 10px;
}

.home{
  background-color: lightgrey;
  min-height: 100vh;
}
.quest-container{
  background-color: white;
  min-height: 100vh;
}

html,
body,
#app-vue {
  min-height: 100vh;
}
</style>

