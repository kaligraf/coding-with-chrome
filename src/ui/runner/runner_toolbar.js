/**
 * @fileoverview Editor for the Coding with Chrome editor.
 *
 * @license Copyright 2015 The Coding with Chrome Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mbordihn@google.com (Markus Bordihn)
 */
goog.provide('cwc.ui.RunnerToolbar');

goog.require('cwc.ui.Helper');
goog.require('cwc.utils.Helper');



/**
 * @constructor
 * @param {!cwc.utils.Helper} helper
 * @struct
 * @final
 */
cwc.ui.RunnerToolbar = function(helper) {
  /** @type {Element} */
  this.node = null;

  /** @type {!cwc.utils.Helper} */
  this.helper = helper;

  /** @type {string} */
  this.prefix = 'toolbar-';

  /** @type {string} */
  this.generalPrefix = this.helper.getPrefix();

  /** @type {boolean} */
  this.runStatus = false;

  /** @type {boolean} */
  this.loadStatus = false;

  /** @type {Element} */
  this.nodeExpand = null;

  /** @type {Element} */
  this.nodeExpandExit = null;

  /** @type {Element} */
  this.nodeReload = null;

  /** @type {Element} */
  this.nodeRun = null;

  /** @type {Element} */
  this.nodeStop = null;

  /** @type {Element} */
  this.nodeInfo = null;

  /** @type {boolean} */
  this.expandState = false;

};


/**
 * @param {!Element} node
 * @param {string=} opt_prefix
 */
cwc.ui.RunnerToolbar.prototype.decorate = function(node, opt_prefix) {
  this.node = node;
  this.prefix = (opt_prefix || '') + this.prefix;

  this.nodeExpand = goog.dom.getElement(this.prefix + 'expand');
  this.nodeExpandExit = goog.dom.getElement(this.prefix + 'expand-exit');
  this.nodeInfo = goog.dom.getElement(this.prefix + 'info');
  this.nodeReload = goog.dom.getElement(this.prefix + 'reload');
  this.nodeRun = goog.dom.getElement(this.prefix + 'run');
  this.nodeStop = goog.dom.getElement(this.prefix + 'stop');

  cwc.ui.Helper.enableElement(this.nodeReload, false);
  cwc.ui.Helper.enableElement(this.nodeStop, false);
  goog.style.showElement(this.nodeExpandExit, false);
  goog.style.showElement(this.nodeInfo, false);

  goog.events.listen(this.nodeExpand, goog.events.EventType.CLICK,
    this.expand.bind(this));
  goog.events.listen(this.nodeExpandExit, goog.events.EventType.CLICK,
    this.collapse.bind(this));
  goog.events.listen(this.nodeInfo, goog.events.EventType.CLICK,
    this.toggleInfo.bind(this));
  goog.events.listen(this.nodeReload, goog.events.EventType.CLICK,
    this.reload.bind(this));
  goog.events.listen(this.nodeRun, goog.events.EventType.CLICK,
    this.run.bind(this));
  goog.events.listen(this.nodeStop, goog.events.EventType.CLICK,
    this.stop.bind(this));
};


/**
 * Runs the code.
 */
cwc.ui.RunnerToolbar.prototype.run = function() {
  var runnerInstance = this.helper.getInstance('runner');
  if (runnerInstance) {
    runnerInstance.run();
  }
};


/**
 * Stops runner instance.
 */
cwc.ui.RunnerToolbar.prototype.stop = function() {
  var runnerInstance = this.helper.getInstance('runner');
  if (runnerInstance) {
    runnerInstance.stop();
  }
};


/**
 * Terminates runner instance.
 */
cwc.ui.RunnerToolbar.prototype.terminate = function() {
  var runnerInstance = this.helper.getInstance('runner');
  if (runnerInstance) {
    runnerInstance.terminate();
  }
};


/**
 * Reloads runner instance.
 */
cwc.ui.RunnerToolbar.prototype.reload = function() {
  var runnerInstance = this.helper.getInstance('runner');
  if (runnerInstance) {
    runnerInstance.reload();
  }
};


/**
 * Shows / hides info window.
 */
cwc.ui.RunnerToolbar.prototype.toggleInfo = function() {
  var runnerInstance = this.helper.getInstance('runner');
  if (runnerInstance) {
    runnerInstance.toggleInfo();
  }
};


/**
 * Sets run status.
 * @param {boolean} running
 * @export
 */
cwc.ui.RunnerToolbar.prototype.setRunStatus = function(running) {
  cwc.ui.Helper.enableElement(this.nodeStop, running);
  this.runStatus = running;
};


/**
 * Sets load status.
 * @param {boolean} loaded
 * @export
 */
cwc.ui.RunnerToolbar.prototype.setLoadStatus = function(loaded) {
  cwc.ui.Helper.enableElement(this.nodeRun, !loaded);
  cwc.ui.Helper.enableElement(this.nodeReload, !loaded);
  this.loadStatus = loaded;
};


/**
 * @param {boolean} enable
 */
cwc.ui.RunnerToolbar.prototype.enableInfoButton = function(enable) {
  if (this.infoButton) {
    cwc.ui.Helper.enableElement(this.nodeInfo, enable);
  }
};


/**
 * Toggles the current expand state.
 */
cwc.ui.RunnerToolbar.prototype.toggleExpand = function() {
  this.expand = !this.expand;
  this.setExpand(this.expand);
};


/**
 * Toggles the current expand state.
 */
cwc.ui.RunnerToolbar.prototype.expand = function() {
  this.setExpand(true);
};


/**
 * Toggles the current expand state.
 */
cwc.ui.RunnerToolbar.prototype.collapse = function() {
  this.setExpand(false);
};


/**
 * Expands or collapse the current window.
 * @param {boolean} expand
 */
cwc.ui.RunnerToolbar.prototype.setExpand = function(expand) {
  this.expandState = expand;
  var layoutInstance = this.helper.getInstance('layout', true);
  if (layoutInstance) {
    layoutInstance.setFullscreen(expand, 0);
    goog.style.showElement(this.nodeExpand, !expand);
    goog.style.showElement(this.nodeExpandExit, expand);
  }
};


/**
 * Shows/Hide the expand button.
 * @param {boolean} visible
 */
cwc.ui.RunnerToolbar.prototype.showExpandButton = function(visible) {
  goog.style.showElement(this.nodeExpand, visible);
};


/**
 * @param {boolean} visible
 */
cwc.ui.RunnerToolbar.prototype.showRunButton = function(visible) {
  goog.style.showElement(this.nodeRun, visible);
};


/**
 * @param {boolean} visible
 */
cwc.ui.RunnerToolbar.prototype.showInfoButton = function(visible) {
  goog.style.showElement(this.nodeInfo, visible);
};
