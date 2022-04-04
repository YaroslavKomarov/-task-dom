import { SIGHUP } from 'constants';

/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    for (let i = 0; i < count; i++) {
        const elem = document.createElement(tag);
        elem.innerHTML = content;
        document.body.append(elem);
    }
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    function genTreeRecursively(parent, childrenCount, lvl, currentLvl) {
        for (let i = 0; i < childrenCount; i++) {
            const child = document.createElement('div');
            child.className = `item_${currentLvl}`;
            parent.appendChild(child);

            if (currentLvl < lvl) {
                genTreeRecursively(child, childrenCount, lvl, currentLvl + 1);
            }
        }
    }

    const root = document.createElement('div');
    root.className = 'item_1';
    genTreeRecursively(root, childrenCount, level, 2);

    return root;
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    const tree = generateTree(2, 3);
    for (const child of tree.querySelectorAll('.item_2')) {
        const section = document.createElement('section');
        section.innerHTML = child.innerHTML;
        section.className = 'item_2';
        tree.replaceChild(section, child);
    }

    return tree;
}
