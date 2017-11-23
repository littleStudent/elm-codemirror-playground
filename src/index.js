import './main.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/monokai.css';
import 'codemirror/addon/hint/show-hint.css';
import { Main } from './Main.elm';
import registerServiceWorker from './registerServiceWorker';
import CodeMirror from 'codemirror';

require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/javascript-hint');
require('codemirror/addon/hint/show-hint');

Main.embed(document.getElementById('root'));

registerServiceWorker();

let defaultValue = `
import { IsLoggedInGuard } from './guards/isLoggedIn.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: 'app/management.module#ManagementModule' },
  {
    path: 'tutorials/:tutorialId/chapters/:chapterId/lessons/:lessonId',
    loadChildren: 'app/editor.module#EditorModule',
    canActivate: [IsLoggedInGuard],
  },
  { path: '**', redirectTo: '' },
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes, {
  useHash: true,
});
`;

setTimeout(() => {
  CodeMirror.commands.autocomplete = function(cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.html);
  };
  var myCodeMirror = CodeMirror.fromTextArea(
    document.getElementById('container'),
    {
      lineNumbers: true,
      readOnly: false,
      theme: 'monokai',
    },
  );
  myCodeMirror.setValue(defaultValue);
  myCodeMirror.setOption('mode', 'javascript');
  myCodeMirror.setOption('extraKeys', { 'Ctrl-Space': 'autocomplete' });
}, 50);
