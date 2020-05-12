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

const menu = document.createElement('ul');
menu.classList.add('right-click-menu');

const liRename = document.createElement('li');
liRename.setAttribute('id', 'rename');
liRename.appendChild(document.createTextNode('Rename'));

const liDelete = document.createElement('li');
liDelete.setAttribute('id', 'delete');
liDelete.appendChild(document.createTextNode('Delete item'));

menu.appendChild(liRename);
menu.appendChild(liDelete);

let selectedItem = null;

function appendIcon(el, isFolder = false) {
    el.appendChild(isFolder
        ? iconFolder.cloneNode(true)
        : iconFile.cloneNode(true));
    el.onmouseover = event => {
        event.stopPropagation();
        el.classList.add('hover');
        selectedItem = el;
    }
    el.onmouseout = event => {
        event.stopPropagation();
        el.classList.remove('hover');
        selectedItem = null;
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
    ul.onmouseover = event => {
        event.stopPropagation();
    }
    return ul;
}

rootNode.appendChild(createUList(data));
rootNode.appendChild(menu);

rootNode.addEventListener('contextmenu', event => {
    event.preventDefault();
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.classList.add('active');
    if (selectedItem) {
        menu.classList.add('bound');
    } else {
        menu.classList.remove('bound');
    }
}, false);

document.addEventListener('click', event => {
    if (event.button !== 2) {
        menu.classList.remove('active');
    }
}, false);
