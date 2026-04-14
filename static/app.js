const API_BASE = "/api/memos";

// メモ一覧を取得して表示
async function loadMemos() {
    try {
        const response = await fetch(API_BASE);
        const memos = await response.json();
        renderMemos(memos);
    } catch (error) {
        showMessage("メモの取得に失敗しました: " + error.message, "error");
    }
}

// メモ一覧を描画
function renderMemos(memos) {
    const container = document.getElementById("memos");
    const countEl = document.getElementById("memo-count");
    countEl.textContent = "(" + memos.length + "件)";

    if (memos.length === 0) {
        container.innerHTML = '<div class="empty-message">メモがありません</div>';
        return;
    }

    container.innerHTML = memos.map(function (memo) {
        const categoryHtml = memo.category
            ? '<span class="memo-category category-' + escapeHtml(memo.category) + '">' + escapeHtml(memo.category) + "</span>"
            : "";

        return (
            '<div class="memo-card">' +
            '  <div class="memo-body">' +
            '    <div class="memo-title">' + escapeHtml(memo.title) + categoryHtml + "</div>" +
            '    <div class="memo-content">' + escapeHtml(memo.content) + "</div>" +
            '    <div class="memo-meta">ID: ' + memo.id + "</div>" +
            "  </div>" +
            '  <div class="memo-actions">' +
            '    <button class="btn btn-danger" onclick="deleteMemo(' + memo.id + ')">削除</button>' +
            "  </div>" +
            "</div>"
        );
    }).join("");
}

// メモを新規作成
async function createMemo(event) {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value.trim();
    const category = document.getElementById("category").value;

    const body = { title: title, content: content };
    if (category) {
        body.category = category;
    }

    try {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const error = await response.json();
            showMessage("作成失敗: " + error.error, "error");
            return;
        }

        showMessage("メモを作成しました", "success");
        document.getElementById("create-memo-form").reset();
        loadMemos();
    } catch (error) {
        showMessage("メモの作成に失敗しました: " + error.message, "error");
    }
}

// メモを削除
async function deleteMemo(id) {
    if (!confirm("このメモを削除しますか？")) return;

    try {
        const response = await fetch(API_BASE + "/" + id, {
            method: "DELETE",
        });

        if (!response.ok) {
            const error = await response.json();
            showMessage("削除失敗: " + (error.error || "この機能はまだ実装されていません"), "error");
            return;
        }

        showMessage("メモを削除しました", "success");
        loadMemos();
    } catch (error) {
        showMessage("メモの削除に失敗しました: " + error.message, "error");
    }
}

// メッセージ表示
function showMessage(text, type) {
    const el = document.getElementById("message");
    el.textContent = text;
    el.className = "message message-" + type;
    el.style.display = "block";
    setTimeout(function () {
        el.style.display = "none";
    }, 4000);
}

// HTMLエスケープ
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// イベント登録・初期読み込み
document.getElementById("create-memo-form").addEventListener("submit", createMemo);
loadMemos();
