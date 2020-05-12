const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');

const icon = document.createElement('span');
icon.classList.add('material-icons');

const iconFolder = icon.cloneNode(false);
iconFolder.appendChild(document.createTextNode('folder'));

const iconFolderOpen = icon.cloneNode(false);
iconFolderOpen.appendChild(document.createTextNode('folder_open'));

const iconFile = icon.cloneNode(false);
iconFile.classList.add('file');
iconFile.appendChild(document.createTextNode('insert_drive_file'));

const folderIsEmpty = document.createElement('li');
folderIsEmpty.classList.add('empty');
folderIsEmpty.appendChild(document.createTextNode('Folder is empty'));

function appendIcon(el, isFolder=false) {
    el.appendChild(isFolder
        ? iconFolder.cloneNode(true)
        : iconFile.cloneNode(true));
    el.onmouseover = function (ev) {
        ev.stopPropagation();
        el.classList.add('hover');
    }
    el.onmouseout = function (ev) {
        ev.stopPropagation();
        el.classList.remove('hover');
    }
}

function createUList(data) {
    let ul = document.createElement('ul');
    for (let el of data) {
        let li = document.createElement('li');
        appendIcon(li, el['folder']);
        li.appendChild(document.createTextNode(el['title']));
        if (el['folder']) {
            if (!el['children']) {
                ul.appendChild(li);
                ul.appendChild(folderIsEmpty.cloneNode(true));
            } else {
                li.appendChild(createUList(el.children));
                ul.appendChild(li);
            }
        } else {
            ul.appendChild(li);
        }
    }
    return ul;
}

rootNode.appendChild(createUList(data));
