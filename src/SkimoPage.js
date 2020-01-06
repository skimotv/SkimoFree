'use strict';

import $ from 'jquery';
import {Utils} from './Utils';
export default class SkimoPage {

  constructor() {}

  async loadSkimos(skimoId) {

    this.skimoId = skimoId;
    $.ajax({
      url: 'http://api.skimo.tv:2345/skimo/' + skimoId,
      context: this,
      error: function(result) {
        console.log("Server error", result);
        $('#add2').prop('disabled', false);
      },
      success: (result) => this.createCard(result),
      async: true
    });
  }


  createCard(result) {
    if (!result || result.isOk == false) {
      console.log("Request error", result);
      $('#add2').prop('disabled', false);
    } else {
      try {
        let skimoContent = $('#skimo-content');
        let data = result;
        $('#add2').prop('disabled', true);
        $('#skimo-title').text(Utils.escapeHtml(data.title));
        for (let i = 0; i < data.elements.length; i++) {
          let skimo = data.elements[i];
          skimo.id = Utils.escapeHtml(skimo.id.toString());
          skimo.end = Utils.escapeHtml(skimo.end.toString());
          skimo.skimo = Utils.escapeHtml(skimo.skimo.toString());
          skimo.start = Utils.escapeHtml(skimo.start.toString());
          skimo.text = Utils.escapeHtml(skimo.text.toString());
          if(document.getElementById('skimo-card-'+skimo.id)) {
            continue;
          }
          if (skimo.skimo === "Skimo") {
            let startminute = (skimo.start / 60 >= 10) ? Math.floor(skimo.start / 60) : "0" + Math.floor(skimo.start / 60);
            let startsecond = (skimo.start % 60 >= 10) ? skimo.start % 60 : "0" + (skimo.start % 60);
            let endminute = (skimo.end / 60 >= 10) ? Math.floor(skimo.end / 60) : "0" + Math.floor(skimo.end / 60);
            let endsecond = (skimo.end % 60 >= 10) ? skimo.end % 60 : "0" + (skimo.end % 60);
            const tweet = "..." + skimo.text.slice(0, 80) + "... " + escape("#") +"SkimoTV";
            const skimoLink = "https://www.netflix.com/watch/"+this.skimoId+"?t="+skimo.start;
            const twitterLink = "http://twitter.com/share?text="+ tweet  +"&url=" + skimoLink;
            const element = $(`<div class="fp-help mdl-cell
      mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop" id="skimo-card-`+ skimo.id + `">
        <div class="card">
          <div class="card-content">
            <span class="card-title">${startminute}:${startsecond} - ${endminute}:${endsecond}</span>
            <blockquote class="skimo-blockquote">
              <p>
                "${skimo.text}"
              </p>
            </blockquote>
          </div>
          <div class="card-action">
            <a class="skimo-link" style="color:red;" href="${skimoLink}" target="_blank">
            <i class="fa fa-play left" style="font-size:24px;color:red"></i>
            </a>
            <a href="${twitterLink}" target="_blank">
            <i class="fab fa-twitter right" style='font-size:24px;color:#00aced'></i></a>
          </div>
        </div>
      </div>
            `);
            //$('.skimo-link', element).attr('href', `${skimoLink}`);
            skimoContent.append(element);
          }
        }
      } catch (e) {
        console.log(e);
        console.log(result.message);
      }
    }
  }
};
